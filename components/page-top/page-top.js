Component({
  mixins: [],
  data: {
    address_list: [],             // 所有地址列表
    address_index: 0,             //选中的地址下标
    address_name: "",             //选中的地址名称
    current_date: "",             //当前日期
    set_date: "",                 //送餐日期
    meal_list: [{
      id: '1',
      name: '午餐'
    }, {
      id: '2',
      name: '晚餐'
    }],                            //哪一餐列表
    meal_name: "",                 //选中的哪一餐名称
    lunch_date: '',
    dinner_date: '',
    index: 0,                      //选中的下标
  },
  props: {
    page_type: '',                  //1:用户点餐；2:商家上架
    store_id: "",                  //当前选中的商家ID
    store_info: {},                 //当前商家的信息
    last_address_index: 0,         //上次选中的地址下标
    show_address: true,            //是否显示送餐地址
    is_check_address: true,        //是否可切换送餐地址
    is_check: true,                //是否可切换送餐日期和哪一餐
  },
  didUpdate(prevProps, prevData) {
    this.setData({
      address_index: this.props.last_address_index,
      address_list: getApp().globalData.address_list,
      address_name: getApp().globalData.address_list[this.props.last_address_index].name,
    })
  },
  didMount() {
    // let date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1;
    // var day = date.getDate();
    // if (month < 10) {
    //   month = "0" + month;
    // }
    // if (day < 10) {
    //   day = "0" + day;
    // }
    
    let store_date = this.props.store_info.date;      //当前最近的可点餐日期（用户用）
    // let meal_index = this.props.page_type == '1' ? (this.props.store_info.type == 2 ? 1 : 0) : 0; //午餐和晚餐下标
    let meal_index = this.props.store_info.type - 1; //午餐和晚餐下标

    // let current_date = year + "-" + month + "-" + day;    //当前日期（商家用）

    this.setData({
      index: meal_index,
      meal_name: this.data.meal_list[meal_index].name,
      address_index: this.data.address_index,
      address_list: getApp().globalData.address_list,
      address_name: getApp().globalData.address_list[this.data.address_index].name,
      // current_date: this.props.page_type == '1' ? store_date : current_date,
      // set_date: this.props.page_type == '1' ? store_date : current_date,
      current_date: store_date,
      set_date: store_date,
      lunch_date: this.props.store_info.lunch,
      dinner_date: this.props.store_info.dinner,
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
      //监听切换
      this.onChange('0', index);
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
            var select_date = new Date(res.date).valueOf();
            var current_date = new Date(this.data.current_date).valueOf();
            if (select_date > current_date) {
              this.setData({
                set_date: res.date
              })
              //监听切换
              this.onChange('1');
            } else {
              dd.showToast({
                type: 'none',
                content: '所选日期必须大于送餐日期！',
                duration: 2000
              });
            };

          }
        },
      });
    },
    //切换哪一餐
    bindPickerChange(e) {
      if (this.data.is_check == false) {
        return;
      }
      let index = e.detail.value;
      this.setData({
        index: e.detail.value,
        meal_name: this.data.meal_list[index].name
      });
      //监听切换
      this.onChange('1');
    },
    //监听切换
    onChange(type, index) {  //1:发送请求；2:不请求
      let i = index || index == 0 ? index : this.data.address_index;
      let arg = {
        is_request: type,
        address_index: i,
        address_type: this.data.address_list[i].id,
        address_text: this.data.address_list[i].name,
        day: this.data.set_date,
        type: this.data.meal_list[this.data.index].id,
        end_time: this.data.index == 0 ? this.data.lunch_date : this.data.dinner_date,
        type_text: this.data.meal_name
      }
      this.props.onChange(arg)
    }
  },
});
