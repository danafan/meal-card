Page({
  data: {
    date: "",        //当前日期
    active_index: '0',  //当前选中状态下标
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
  //切换状态
  checkStatus(e) {
    this.setData({
      active_index: e.target.dataset.index
    })
  },
  //跳转到取餐码
  takeFoodCode() {
    dd.navigateTo({
      url: '/page/user/take_food_code/take_food_code'
    })
  }
});
