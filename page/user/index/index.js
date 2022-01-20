let app = getApp();
const resource = require('../../../utils/api.js').API;
Page({
  data: {
    qr_code_url: '',
    show_dialog: false,   //付款成功弹窗
    card_info: {},         //餐卡信息
    set_interval: null,    //一分钟计时
    amount: "",
    store_name: ""

  },
  onShow() {
    //创建websocket链接并监听支付结果
    this.createdSocket();
    //获取餐卡信息
    this.getCardInfo();
    //获取付款码
    this.getQrCode();
    this.setInterVal();
  },
  //页面被关闭（断开WebSocket）
  onHide() {
    clearInterval(this.data.set_interval);
    dd.closeSocket();
  },
  //创建websocket链接并监听支付结果
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
    });
    //接收支付结果信息
    dd.onSocketMessage((res) => {
      var data = JSON.parse(res.data)
      if (data.status == 1) {
        this.setData({
          amount: data.amount,
          store_name: data.store_name,
          show_dialog: true
        })
      }
    });
    //监听断开
    this.onChangeClose();
  },
  //监听断开
  onChangeClose(){
    dd.onSocketClose((res) => {
      //创建websocket链接并监听支付结果
      this.createdSocket();
    });
  },
  //开始计时
  setInterVal() {
    this.setData({
      set_interval: setInterval(() => {
        //获取付款码
        this.getQrCode();
      }, 60000)
    })
  },
  //获取餐卡信息
  getCardInfo() {
    resource.getCardInfo().then(res => {
      this.setData({
        card_info: res.data
      })
    })
  },
  //获取付款码
  getQrCode() {
    resource.getQrCode().then(res => {
      this.setData({
        qr_code_url: res.payment_code
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
  }
});
