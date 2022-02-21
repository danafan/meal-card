Component({
  props: {
    userType: '1',     //1:员工；2:商家
    dateType: '1',     //1:月账单；2:日账单
    month:"",
    date:"",
    consumption: '',   //消费金额
    num:"",
    topUp: "",         //充值金额
    collection: '',    //收款金额
  },
  methods: {
    //点击选择日期
    openDatePicker() {
      dd.datePicker({
        format: this.props.dateType == '1'?'yyyy-MM':'yyyy-MM-dd',
        currentDate: this.props.dateType == '1'?this.props.month:this.props.date,
        success: (res) => {
          if (res.date) {
            this.props.onCheckDate(res.date);
          }
        },
      });

    }
  },
});
