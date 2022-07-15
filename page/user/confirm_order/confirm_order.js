Page({
  data: {
    total_price: 24.9,       //总价
    order_list: [1, 2, 3, 4],   //订单列表
    remark: "",              //备注
  },
  onLoad() { },
  //监听备注输入
  checkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  //点击免密支付
  paybalFn() {
    console.log(this.data.remark)
    dd.navigateTo({
      url: '/page/user/paybal_results/paybal_results'
    })
  },
});
