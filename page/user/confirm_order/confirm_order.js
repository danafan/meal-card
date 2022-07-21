const resource = require('../../../utils/api.js').API;
Page({
  data: {
    car_info: {},
    car_lists: [],
    remark: "",              //备注
    show_message: false,

  },
  onLoad() {
    let order_info = getApp().globalData.car_info;
    this.setData({
      car_info: order_info.info,
      car_lists: order_info.list
    })
  },
  //监听备注输入
  checkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  //点击免密支付
  paybalFn() {
    this.setData({
      show_message: true
    })
  },
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      let ids_list = [];
      this.data.car_lists.map(item => {
        ids_list.push(item.dishes_id + '_' + item.num);
      })
      let arg = {
        day: this.data.car_info.day,
        type: this.data.car_info.type,
        address_type: this.data.car_info.address_type,
        ids: ids_list.join(','),
        remark: this.data.remark
      }
      resource.userCreateOrder(arg).then(res => {
        let toast_text = '支付成功';
        dd.redirectTo({
          url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=' + toast_text
        })
      });
    } else {
      this.setData({
        show_message: false
      })
    }
  }
});
