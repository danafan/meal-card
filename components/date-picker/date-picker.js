Component({
  mixins: [],
  data: {
    year: "",      //年
    month: "",     //月
  },
  props: {
    userType: '1',     //1:员工；2:商家
    consumption: '',   //消费金额
    topUp: "",         //充值金额
    collection: '',    //收款金额
  },
  didMount() {
    var now = new Date(); 				    //当前日期  
    var nowMonth = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1; 		//当前月 
    var nowYear = now.getFullYear(); 		  //当前年 
    this.setData({
      year: nowYear,
      month: nowMonth
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    //点击选择日期
    openDatePicker() {
      dd.datePicker({
        format: 'yyyy-MM',
        currentDate: this.data.year + '-' + this.data.month,
        success: (res) => {
          if (res.date) {
            this.setData({
              year: res.date.split('-')[0],
              month: res.date.split('-')[1]
            })
            this.props.onCheckDate(res.date);
          }
        },
      });

    }
  },
});
