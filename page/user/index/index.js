Page({
  data: {
    show_dialog: false,   //付款成功弹窗
  },
  onLoad() { },
  //跳转账单
  goBill() {
    dd.navigateTo({
      url: '/page/user/user_bill/user_bill'
    })
  },
  //刷新付款码
  refresh() {
    console.log('刷新')
  },
  //点击确认
  confirm() {
    this.setData({
      show_dialog: false
    })
  }
});
