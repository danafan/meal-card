Page({
  data: {
    show_dialog:true,   //付款成功弹窗
  },
  onLoad() {},
  refresh(){
    console.log('刷线')
  },
  //点击确认
  confirm(){
    this.setData({
      show_dialog:false
    })
  }
});
