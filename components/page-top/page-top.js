Component({
  mixins: [],
  data: {
    address_list: getApp().globalData.address_list,   // 所有地址列表
    address_index: 0,         //选中的地址下标
    address_name: "",         //选中的地址名称
    current_date: "",        //当前日期
    set_date: "",            //送餐日期
    meal_list: ['午餐', '晚餐'],
    lunch_date:getApp().globalData.lunch_date,                          //商家午餐和晚餐的截止时间
    dinner_date:getApp().globalData.dinner_date, 
    index: 0,                //选中的下标
  },
  props: {
    show_address: true,         //是否显示送餐地址
    is_check_address: true,     //是否可切换送餐地址
    is_check: true,             //是否可切换送餐日期和哪一餐
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
    let time = current_date + ' ' + this.data.lunch_date;
    this.setData({
      index:new Date().getTime() > Date.parse(time)?1:0,
      address_name: this.data.address_list[this.data.address_index].name,
      current_date: current_date,
      set_date: current_date
    })
    //监听切换
    this.onChange('1');
  },
  methods: {
    //切换地址
    changeAddress(e) {
      if (this.props.is_check_address == 'false') {
        return;
      }
      let index = e.detail.value;
      this.setData({
        address_index: index,
        address_name: this.data.address_list[index].name
      });
      //监听切换
      this.onChange('0');
    },
    //切换送餐日期
    checkSetFn() {
      if (this.props.is_check == 'false') {
        return;
      }
      dd.datePicker({
        format: 'yyyy-MM-dd',
        currentDate: this.data.current_date,
        success: (res) => {
          if (res.date) {
            this.setData({
              set_date: res.date
            })
            //监听切换
            this.onChange('1');
          }
        },
      });
    },
    //切换哪一餐
    bindPickerChange(e) {
      if (this.data.is_check == false) {
        return;
      }
      this.setData({
        index: e.detail.value,
      });
      //监听切换
      this.onChange('1');
    },
    //监听切换
    onChange(type) {  //1:发送请求；2:不请求
      let arg = {
        is_request: type,
        address_index: this.data.address_index,
        address_type: this.data.address_list[this.data.address_index].id,
        address_text: this.data.address_list[this.data.address_index].name,
        day: this.data.set_date,
        type: this.data.index + 1,
        type_text: this.data.meal_list[this.data.index]
      }
      this.props.onChange(arg)
    }
  },
});
