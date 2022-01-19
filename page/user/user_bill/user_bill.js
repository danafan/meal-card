Page({
  data: {
    active_index:1,     //当前选中的tab下标
  },
  onLoad() {},
  //切换顶部tab
  checkTab(e){
    this.setData({
      active_index:e.target.dataset.index
    })
  },
  //监听日期切换
  checkDate(date){
    console.log(date)
  }
});
