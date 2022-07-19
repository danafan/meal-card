Page({
  data: {
    result_type:'',    // 0:空；1: 成功
    toast_text:"",      //提示文字
    show_back:"",       //不为空则显示返回按钮
    show_scan:"",       //不为空则显示继续扫码按钮
  },
  onLoad(e) {
    this.setData({
      result_type:e.result_type,
      toast_text:e.toast_text,
      show_back:e.show_back,
      show_scan:e.show_scan
    })
  },
});
