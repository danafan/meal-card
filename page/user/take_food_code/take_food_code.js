const resource = require('../../../utils/api.js').API;
Page({
  data: {
    order_id: "",          //订单ID
    date:"",              //日期
    type:"",              //哪一餐
    qr_code_url: '',
    time: 60
  },
  onLoad(e) {
    this.setData({
      order_id: e.id,
      type:e.type
    })
    //每分钟刷新付款码
    this.refreshQrCode();
    //获取付款码
    this.getQrCode();
  },
  //页面被关闭
  onUnload() {
    //断开一分钟
    clearInterval(this.data.set_interval);
  },
  //每分钟刷新付款码
  refreshQrCode() {
    this.setData({
      set_interval: setInterval(() => {
        this.setData({
          time: this.data.time - 1
        })
        if (this.data.time == 0) {
          //获取付款码
          this.getQrCode();
        }
      }, 1000)
    })
  },
  //获取付款码
  getQrCode() {
    let arg = {
      order_id: this.data.order_id
    }
    resource.getMealCode(arg).then(res => {
      this.setData({
        time: 60,
        qr_code_url: res.data.meal_code,
        date:res.data.day
      })
    })
  },
  //返回
  goBack() {
    dd.navigateBack({
      delta: 1
    })
  }
});
