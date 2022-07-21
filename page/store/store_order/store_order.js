const resource = require('../../../utils/api.js').API;
Page({
  data: {
    date: "",        //当前日期
    active_index: '1',  //当前选中状态下标
    up_menu_list: [],    //头部列表
    address_list: ['全部','大王椰', '国泰'], //地址列表
    index: 0,                //选中的地址下标
    status_index: '0',       //打包状态选项
    page: 1,                        //页码
    isLoad: true,
    order_list: ['']
  },
  onLoad() {
    var now = new Date(); 				    //当前日期  
    var nowDay = now.getDate();      //当前日
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    this.setData({
      date: nowYear + '-' + nowMonth + '-' + nowDay
    })
    //获取头部列表
    this.storeOrderTotal();
  },
  //点击选择日期
  openDatePicker() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.date,
      success: (res) => {
        if (res.date) {
          this.setData({
            date: res.date
          })
          //获取头部列表
          this.storeOrderTotal();
        }
      },
    });
  },
  //切换类型
  checkType(e) {
    this.setData({
      active_index: e.target.dataset.index
    })
    //获取头部列表
    this.storeOrderTotal();
  },
  //获取头部列表
  storeOrderTotal() {
    let arg = {
      day: this.data.date,
      type: this.data.active_index
    }
    resource.storeOrderTotal(arg).then(res => {
      this.setData({
        up_menu_list: res.data.list
      })
    });
  },
  //切换状态
  checkStatus(e) {
    this.setData({
      status_index: e.target.dataset.index
    })
  },
  //切换地址
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
    });
  },
   //上拉加载
  loadMore(e) {
    if (this.data.isLoad == false) {
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
    //获取底部列表接口
    this.storeOrderDishesList()
  },
  //获取底部列表接口
  storeOrderDishesList() {
    let arg = {
      day: this.data.date,
      type: this.data.active_index,
      address_type:this.data.index == 0?'':this.data.index,
      package_status:this.data.status_index
    }
    resource.storeOrderDishesList(arg).then(res => {
     let data = res.data;
      this.setData({
        order_list: this.data.order_list.concat(Array.from(data.data))
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
