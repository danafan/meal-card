const resource = require('../../../utils/api.js').API;
let app = getApp();
Page({
  data: {
    showRefund: false,   //申请退款弹窗
    dateType: '1',       //1:月账单；2:日账单
    why_list: [],        //所有原因列表
    active_index: 0,     //选中的下标
    page: 1,             //页码
    month: "",           //月账单所需参数
    date: "",            //日账单所需参数
    data_list: [],       //列表数据
    isLoad: true,
    collection: "",
    num: "",
    amount: "",      //点击退款的标题（钱数）
    id: "",          //点击退款的ID
  },
  onLoad() {
    var now = new Date(); 				    //当前日期  
    var nowDay = now.getDate();      //当前日
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    this.setData({
      month: nowYear + '-' + nowMonth,
      date: nowYear + '-' + nowMonth + '-' + nowDay
    })
    //获取列表
    this.getData();
  },
  //切换时间类型
  checkDateType() {
    this.setData({
      dateType: this.data.dateType == '1' ? '2' : '1',
      page: 1,
      data_list: [],
      collection: "",
      num: ""
    })
    //获取列表
    this.getData();
  },
  //监听日期切换
  checkDate(date) {
    if (this.data.dateType == '1') {
      this.setData({
        month: date
      })
    } else if (this.data.dateType == '2') {
      this.setData({
        date: date
      })
    }
    this.setData({
      collection: "",
      num: "",
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
      type: this.data.dateType
    }
    if (this.data.dateType == '1') {
      arg.month = this.data.month
    } else if (this.data.dateType == '2') {
      arg.date = this.data.date
    }
    resource.getStoreRecord(arg).then(res => {
      let data = res.data;
      //加入是否显示退款按钮
      if (data.data.length == 0) {
        return;
      }
      var now = new Date(); 				    //当前日期  
      var now_day = now.getDate();
      data.data.map(item => {
        var is_show = false;
        if (item.status == 1) {
          let current_day = item.add_time.split(' ')[0].split('-')[2];
          is_show = current_day == now_day ? true : false
        }
        item.is_show = is_show;
      })
      this.setData({
        data_list: this.data.data_list.concat(Array.from(data.data)),
        collection: res.collection,
        num: res.num
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
  //点击退款
  refundFun(id, amount) {
    //获取退款原因
    resource.getRefundReason().then(res => {
      this.setData({
        why_list: res.data,
        id: id,
        amount: amount,
        showRefund: true
      })
    })
  },
  //切换原因
  checkWhy(e) {
    this.setData({
      active_index: e.target.dataset.index
    })
  },
  //点击退款确定
  confirm() {
    let arg = {
      store_record_id: this.data.id,
      reason: this.data.why_list[this.data.active_index].reason
    }
    resource.refundMoney(arg).then(res => {
      dd.showToast({
        type: 'none',
        content: res.msg,
        duration: 2000
      });
      this.setData({
        showRefund: false,
        active_index: 0,
        page: 1,
        data_list: []
      })
      //获取列表
      this.getData()
    })

  },
  //点击退款取消
  cancel() {
    this.setData({
      showRefund: false,
      active_index: 0
    })
  },
});
