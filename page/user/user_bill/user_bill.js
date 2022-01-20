const resource = require('../../../utils/api.js').API;
Page({
  data: {
    active_index: 1,     //当前选中的tab下标
    page: 1,             //页码
    month: "",           //日期
    data_list: [],       //列表数据
    isLoad: true,
    consumption: "",     //已消费
    recharge: "",        //已充值
  },
  onLoad() {
    var now = new Date(); 				    //当前日期  
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    this.setData({
      month: nowYear + '-' + nowMonth
    })
    //获取列表
    this.getData();
  },
  //切换顶部tab
  checkTab(e) {
    this.setData({
      active_index: e.target.dataset.index,
      data_list: [],
      page: 1
    })
    //获取列表
    this.getData();
  },
  //监听日期切换
  checkDate(date) {
    this.setData({
      month: date,
      data_list: [],
      page: 1
    })
    //获取列表
    this.getData();
  },
  //上拉加载
  loadMore(e) {
    if (this.data.isLoad == false) {
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
    //获取列表
    this.getData()
  },
  //获取列表
  getData() {
    let arg = {
      page: this.data.page,
      month: this.data.month,
      type: this.data.active_index
    }
    resource.userCardRecord(arg).then(res => {
      let data = res.data;
      this.setData({
        data_list: this.data.data_list.concat(Array.from(data.data)),
        consumption: res.consumption,
        recharge: res.recharge
      });
      if (data.last_page == this.data.page) {
        this.setData({
          isLoad: false
        })
      } else {
        this.setData({
          isLoad: true
        })
      }
    });
  }
});
