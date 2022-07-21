const resource = require('../../../utils/api.js').API;
Page({
  data: {
    date: "",        //当前日期
    active_index: '1',  //当前选中状态下标
    up_menu_list: [],    //头部列表
    address_list: [], //地址列表
    index: 0,                //选中的地址下标
    address_id: "",            //选中的地址下标ID
    status_index: '0',       //打包状态选项
    page: 1,                        //页码
    isLoad: true,
    order_list: [],
    total_number: 0,        //总数
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
    //获取底部列表接口
    this.storeOrderDishesList();
  },
  //点击选择日期
  openDatePicker() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.date,
      success: (res) => {
        if (res.date) {
          this.setData({
            page: 1,
            date: res.date
          })
          //获取头部列表
          this.storeOrderTotal();
          //获取底部列表接口
          this.storeOrderDishesList()
        }
      },
    });
  },
  //切换类型
  checkType(e) {
    this.setData({
      page: 1,
      active_index: e.target.dataset.index
    })
    //获取头部列表
    this.storeOrderTotal();
    //获取底部列表接口
    this.storeOrderDishesList()
  },
  //获取头部列表
  storeOrderTotal() {
    let arg = {
      day: this.data.date,
      type: this.data.active_index
    }
    resource.storeOrderTotal(arg).then(res => {
      let address_list = res.data.address_list;
      let all_obj = {
        name: '全部',
        id: ''
      }
      address_list.unshift(all_obj)
      this.setData({
        up_menu_list: res.data.list,
        address_list: address_list
      })
    });
  },
  //切换状态
  checkStatus(e) {
    this.setData({
      page: 1,
      status_index: e.target.dataset.index
    })
    //获取底部列表接口
    this.storeOrderDishesList()
  },
  //切换地址
  bindPickerChange(e) {
    this.setData({
      page: 1,
      index: e.detail.value,
      address_id: this.data.address_list[e.detail.value].id
    });
    //获取底部列表接口
    this.storeOrderDishesList()
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
      package_status: this.data.status_index
    }
    if (this.data.index != 0) {
      arg.address_type = this.data.address_id;
    }
    resource.storeOrderDishesList(arg).then(res => {
      let data = res.data;
      if (data.length == 0) {
        this.setData({
          total_number: 0,
          order_list: []
        });
        return;
      };
      this.setData({
        total_number: data.total,
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
  },
  //点击确认打包
  setPackage(v) {
    let arg = {
      order_id: v.target.dataset.id
    }
    resource.setPackage(arg).then(res => {
      dd.showToast({
        type: 'none',
        content: '打包成功',
        duration: 2000
      });
      let new_order_list = JSON.parse(JSON.stringify(this.data.order_list));
      let index = v.target.dataset.index;
      new_order_list.splice(index, 1);
      this.setData({
        order_list: new_order_list
      })
    });
  }
});
