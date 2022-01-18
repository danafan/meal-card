Page({
  data: {
    money: "",
    show_dialog: true,   //首款款成功弹窗
  },
  onLoad() { },
  //监听金额输入
  checkMoney(v) {
    this.money = v.detail.value;
    console.log(this.money)
  },
  //点击弹窗确认
  confirm() {
    this.setData({
      show_dialog: false
    })
  }
});
