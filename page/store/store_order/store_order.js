Page({
  data: {
    date: "",        //当前日期
    active_index: '0',  //当前选中状态下标
    address_list:['大王椰','国泰'], //地址列表
    index:0,                //选中的地址下标
    status_index:'0',       //打包状态选项
  },
  onLoad() {
    var now = new Date(); 				    //当前日期  
    var nowDay = now.getDate();      //当前日
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    this.setData({
      date: nowYear + '-' + nowMonth + '-' + nowDay
    })
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
        }
      },
    });
  },
  //切换类型
  checkType(e){
    this.setData({
      active_index: e.target.dataset.index
    })
  },
  //切换状态
  checkStatus(e) {
    this.setData({
      status_index: e.target.dataset.index
    })
  },
  //切换地址
  bindPickerChange(e){
     this.setData({
      index: e.detail.value,
    });
  }
});
