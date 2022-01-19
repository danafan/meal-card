Page({
  data: {
    money: "",
    show_dialog: false,   //首款款成功弹窗
  },
  onLoad() { },
  //确认收款
  collFun() {
    if (this.data.money == '') {
      dd.showToast({
        type: 'none',
        content: '请输入收款金额',
        duration: 2000
      });
    } else {
      this.setData({
        show_dialog: true
      })
    }
  },
  //跳转账单
  goBill() {
    dd.navigateTo({
      url: '/page/store/store_bill/store_bill'
    })
  },
  //监听金额输入
  checkMoney(v) {
    this.setData({
      money:v.detail.value
    })
  },
  //点击弹窗确认
  confirm() {
    this.setData({
      show_dialog: false
    })
  }
});
