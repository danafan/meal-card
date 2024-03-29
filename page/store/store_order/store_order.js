const resource = require('../../../utils/api.js').API;
Page({
  data: {
    date: "",                   //当前日期
    active_index: '1',          //当前选中状态下标
    up_menu_list: [],           //头部列表
    address_list: [],           //地址列表
    index: 0,                   //选中的地址下标
    address_id: "",             //选中的地址下标ID
    status_index: '0',          //打包状态选项
    page: 1,                    //页码
    isLoad: true,
    order_list: [],
    total_number: 0,            //总数
    total_price: 0,             //总金额
    show_message: false,
    order_id: ""
  },
  onLoad() {
    var now = new Date(); 				        //当前日期  
    var nowDay = now.getDate();           //当前日
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    //处理送货地址
    let address_list = JSON.parse(JSON.stringify(getApp().globalData.address_list));
    let all_obj = {
      name: '全部',
      id: ''
    }
    address_list.unshift(all_obj);
    this.setData({
      date: nowYear + '-' + nowMonth + '-' + nowDay,
      address_list: address_list
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
            order_list: [],
            total_number: 0,
            total_price: 0,
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
      order_list: [],
      total_number: 0,
      total_price: 0,
      active_index: e.target.dataset.index
    })
    //获取头部列表
    this.storeOrderTotal();
    //获取底部列表接口
    this.storeOrderDishesList()
  },
  //切换状态
  checkStatus(e) {
    this.setData({
      page: 1,
      order_list: [],
      total_number: 0,
      total_price: 0,
      status_index: e.target.dataset.index
    })
    //获取头部列表
    this.storeOrderTotal();
    //获取底部列表接口
    this.storeOrderDishesList()
  },
  //切换地址
  bindPickerChange(e) {
    this.setData({
      page: 1,
      order_list: [],
      total_number: 0,
      total_price: 0,
      index: e.detail.value,
      address_id: this.data.address_list[e.detail.value].id
    });
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
      this.setData({
        up_menu_list: res.data.list
      })
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
      package_status: this.data.status_index,
      page: this.data.page,
      pagesize: 10
    }
    if (this.data.index != 0) {
      arg.address_type = this.data.address_id;
    }
    resource.storeOrderDishesList(arg).then(res => {
      let data = res.data;
      this.setData({
        total_number: data.total_num,
        total_price: data.total_amount
      });
      if (!data.data) {
        return;
      };
      //处理送餐地址
      let arr = data.data;
      arr.map(item => {
        this.data.address_list.map(iii => {
          if (item.address_type == iii.id) {
            item.address_type_str = iii.name
          }
        })
      })
      this.setData({
        order_list: this.data.order_list.concat(Array.from(arr))
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
      this.setData({
        page: 1,
        order_list: []
      });
      //获取头部列表
      this.storeOrderTotal();
      //获取底部列表接口
      this.storeOrderDishesList()
    });
  },
  //退款
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      let arg = {
        order_id: this.data.order_id
      }
      resource.storeCancelOrder(arg).then(res => {
        dd.showToast({
          type: 'none',
          content: '已退款',
          duration: 2000
        });
        this.setData({
          page: 1,
          show_message: false,
          order_list: []
        });
        //获取头部列表
        this.storeOrderTotal();
        //获取底部列表接口
        this.storeOrderDishesList()
      });
    } else {
      this.setData({
        show_message: false
      })
    }
  },
  //退款
  cancelOrder(v) {
    this.setData({
      order_id: v.target.dataset.id,
      show_message: true
    })
  }
});
