Page({
  data: {
    result_type:'2',    // 1: 成功；2:失败
    toast_text:"",      //提示文字
  },
  onLoad() {
    this.setData({
      toast_text:this.data.result_type == '1'?'支付成功':'支付失败'
    })
  },
});
