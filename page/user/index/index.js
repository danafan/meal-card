let app = getApp();
const resource = require('../../../utils/api.js').API;
Page({
  data: {
    qr_code_url: '',
    show_dialog: false,   //付款成功弹窗
    card_info: {},         //餐卡信息
    set_interval: null,    //一分钟计时
    send_interval: null,     //三秒钟计时
    amount: "",
    store_name: ""

  },
  //每次页面打开
  onShow() {
    //创建websocket链接并监听消息
    this.createdSocket();
  },
  //页面被关闭
  onHide() {
    //断开一分钟
    clearInterval(this.data.set_interval);
    //断开三秒
    clearInterval(this.data.send_interval);
    //断开websocket
    dd.closeSocket();

  },
  //创建wbesocket链接
  createdSocket() {
    // 创建wbesocket链接
    dd.connectSocket({
      url: getApp().globalData.wsUrl,
      header: {
        'userid': getApp().globalData.user_info.userid,
        'card_id': getApp().globalData.user_info.card_id,
        'user_type': getApp().globalData.user_info.user_type
      },
      method: "GET",
      success: () => {
        //连接成功
        this.socketOpen();
      },
      fail: (err) => {
        //连接失败
        dd.showToast({
          type: 'none',
          content: '正在重连',
          duration: 1000,
          success: () => {
            //创建websocket链接并监听支付结果
            this.createdSocket();
          }
        });
      }
    });
  },
  //确认已连接
  socketOpen() {
    //获取付款码
    this.getQrCode();
    //每分钟刷新付款码
    this.refreshQrCode();
    //每三秒发送一次信息
    this.sendMessage();
    //接收支付结果信息
    this.onMessage();
  },
  //接收支付结果信息
  onMessage() {
    dd.onSocketMessage((res) => {
      var data = JSON.parse(res.data)
      if (data.status == 1) {
        dd.vibrate();
        this.setData({
          amount: data.amount,
          store_name: data.store_name,
          show_dialog: true
        })
      }
    });
  },
  //每分钟刷新付款码
  refreshQrCode() {
    this.setData({
      set_interval: setInterval(() => {
        //获取付款码
        this.getQrCode();
      }, 60000)
    })
  },
  //每三秒发送一次信息
  sendMessage() {
    this.setData({
      send_interval: setInterval(() => {
        dd.sendSocketMessage({
          data: '11111', // 需要发送的内容
          fail: (err) => {  //发送失败
            dd.showToast({
              type: 'none',
              content: '正在重连',
              duration: 1000,
              success: () => {
                //断开三秒
                clearInterval(this.data.send_interval);
                //创建websocket链接并监听支付结果
                this.createdSocket();
              }
            });

          }
        });
      }, 3000)
    })
  },
  //获取付款码
  getQrCode() {
    resource.getQrCode().then(res => {
      this.setData({
        qr_code_url: res.payment_code,
        card_info: res.data
      })
    })
  },
  //跳转账单
  goBill() {
    dd.navigateTo({
      url: '/page/user/user_bill/user_bill'
    })
  },
  //点击确认
  confirm() {
    this.setData({
      show_dialog: false
    })
    //获取付款码
    this.getQrCode();
  }
});
