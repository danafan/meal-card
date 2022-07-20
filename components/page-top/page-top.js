Component({
  mixins: [],
  data: {
    current_date: "",        //当前日期
    set_date: "",           //送餐日期
    index: 0,                //选中的下标
    meal_list: ['午餐', '晚餐'],
    stop_date: "",          //截止订餐时间
  },
  props: {
    show_address: false,         //是否显示送餐地址
    is_check: false,             //是否可选择
  },
  didMount() {
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let current_date = year + "-" + month + "-" + day;
    this.setData({
      current_date: current_date,
      set_date: current_date,
      stop_date: current_date + ' 12:00'
    })
  },
  methods: {
    //切换送餐日期或截止订餐时间
    checkFn(v) {
      let type = v.target.dataset.type;    //1:送餐日期；2:截止订餐时间
      dd.datePicker({
        format: type == '1' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm',
        currentDate: type == '1' ? this.data.current_date : this.data.current_date + ' 12:00',
        success: (res) => {
          if (type == '1') {
            this.setData({
              set_date: res.date
            })
          } else {
            this.setData({
              stop_date: res.date
            })
          }
          //监听切换
          this.onChange();
        },
      });
    },
    //切换哪一餐的下标
    bindPickerChange(e) {
      this.setData({
        index: e.detail.value,
      });
      //监听切换
      this.onChange();
    },
    //监听切换
    onChange() {
      let arg = {
        day: this.data.set_date,
        type: this.data.index + 1,
        end_time: this.data.stop_date
      }
      this.props.onChange(arg)
    }
  },
});
