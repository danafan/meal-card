const resource = require('../../../utils/api.js').API;
Page({
  data: {
    money: "",
    code: "",
    show_dialog: false,   //收款款成功弹窗
    amount:"",
    card_id:""
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
      dd.scan({
        type: 'qr',
        success: (res) => {
          this.setData({
            code: res.code
          })
          this.storePayment();
        }
      });
    }
  },
  //扫码提交
  storePayment() {
    let arg = {
      payment_code: this.data.code,
      amount: this.data.money
    }
    resource.storePayment(arg).then(res => {
      this.setData({
        show_dialog: true,
        amount:res.data.amount,
        card_id:res.data.card_id
      })
    });
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
      money: v.detail.value
    })
  },
  //点击弹窗确认
  confirm() {
    this.setData({
      show_dialog: false
    })
  }
});
