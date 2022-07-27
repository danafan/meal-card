const resource = require('../../../utils/api.js').API;
Page({
  data: {
    code:"",
    order_info:{},  //订单详情
    menu_list:[],   //菜品列表
  },
  onLoad(e) { 
    this.setData({
      code:e.code
    })
    //获取订单详情
    this.getOrderInfo();
  },
  //获取订单详情
  getOrderInfo(){
    let arg = {
      code: this.data.code
    }
    resource.getOrderInfo(arg).then(res => {
      this.setData({
        order_info:res.data,
        menu_list:res.data.list
      })
    })
  },
  //点击确认取餐
  confirmGet() {
    let arg = {
      order_id: this.data.order_info.order_id
    }
    resource.receiveMeal(arg).then(res => {
      dd.redirectTo({
        url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=确认成功&show_scan=1'
      })
    })
  }

});
