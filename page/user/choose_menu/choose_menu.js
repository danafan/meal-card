const resource = require('../../../utils/api.js').API;
Page({
  data: {
    store_id: "",
    store_info: {}, //当前店铺信息
    menu_list: [], //菜单列表
    showModel: false, //购物车弹窗
    car_list: [], //购物车菜单
    total_price: 0, //购物车总金额
    arg: {}, //顶部传回来的数据
    no_click: false, //去结算按钮是否可点击
    showModal: true, //刚进入页面弹窗
    address_list: getApp().globalData.address_list, // 所有地址列表
    address_index: 0, //选中的地址下标
    address_name: "", //选中的地址名称
    default_date: "", //商家默认日期
    set_date: "", //选中的日期
    meal_list: [{
      id: '1',
      name: '午餐'
    }, {
      id: '2',
      name: '晚餐'
    }], //哪一餐列表
    meal_name: "", //选中的哪一餐名称
    lunch_date: '',
    dinner_date: '',
    index: 0, //选中的下标
  },
  onLoad(e) {
    this.setData({
      store_id: e.store_id
    })
    //获取商家配置信息
    this.getStoreConfig();
  },
  //获取商家配置信息
  getStoreConfig() {
    let arg = {
      store_id: this.data.store_id
    }
    resource.getStoreConfig(arg).then(res => {
      let data = res.data;
      this.setData({
        store_info: data
      })
      let default_date = this.data.store_info.date; //当前店铺送餐日期
      let meal_index = this.data.store_info.type - 1; //午餐和晚餐下标
      this.setData({
        address_list: getApp().globalData.address_list,
        index: meal_index,
        meal_name: this.data.meal_list[meal_index].name,
        address_name: getApp().globalData.address_list[this.data.address_index].name,
        default_date: default_date,
        set_date: default_date,
        lunch_date: this.data.store_info.lunch,
        dinner_date: this.data.store_info.dinner,
      })
      //监听切换
      this.onChange('1');
    });
  },
  //切换地址
  changeAddress(e) {
    this.setData({
      address_index: e.detail.value,
      address_name: getApp().globalData.address_list[e.detail.value].name,
    })
    //监听切换
    this.onChange('0');
  },
  //切换送餐日期
  checkSetFn() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.set_date,
      success: (res) => {
        if (res.date) {
          var current_date = new Date(res.date).valueOf();
          var default_date = new Date(this.data.default_date).valueOf();
          if (current_date >= default_date) {
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
    let index = e.detail.value;
    this.setData({
      index: index,
      meal_name: this.data.meal_list[index].name
    });
    //监听切换
    this.onChange('1');
  },
  //顶部加载完成或切换顶部选项
  onChange(is_request) {
    let arg = {
      is_request: is_request,
      address_index: this.data.address_index,
      address_type: this.data.address_list[this.data.address_index].id,
      address_text: this.data.address_list[this.data.address_index].name,
      day: this.data.set_date,
      end_time: this.data.index == 0 ? this.data.lunch_date : this.data.dinner_date,
      type: this.data.meal_list[this.data.index].id,
    }
    //判断去结算按钮是否置灰
    let current_date = arg.day + ' ' + arg.end_time;
    this.setData({
      no_click: new Date().getTime() > Date.parse(current_date.replace(/-/g, '/'))
    })
    //判断是否请求
    if (arg.is_request == '1') {
      //获取菜单列表
      this.userMenuList(arg);
    }
  },
  //弹窗选好菜品
  checkModalStatus(v) {
    this.setData({
      showModal: v.target.dataset.bool,
    })
  },
  //获取菜单列表
  userMenuList(arg) {
    let req = {
      day: arg.day,
      type: arg.type,
      store_id: this.data.store_id
    }
    resource.userMenuList(req).then(res => {
      let data = res.data;
      if (data.length == 0) {
        this.setData({
          menu_list: [],
          car_list: [],
          total_price: 0
        })
        return;
      }
      let list = data.list;
      list.map(item => {
        item.num = 0;
      })
      this.setData({
        menu_list: list,
        car_list: [],
        total_price: 0
      })
      //找到上次选择的地址id
      this.filterAddress(data.last_address_id);
    });
  },
  //找到上次选择的地址id
  filterAddress(id) {
    getApp().globalData.address_list.map((item, index) => {
      if (item.id == id) {
        this.setData({
          address_index:index,
          address_text:item.name,
          address_type:item.id,
        })
      };
    })
  },
  //点击某一个菜品的加或减
  checkFn(id, type, clear) {
    var new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
    var car_list = [];
    //是否可增加
    var is_add = true;
    new_menu_list.map(new_item => {
      if (clear) {
        new_item.num = 0;
      } else {
        if (new_item.dishes_id == id) {
          if (type == '1') {
            if (new_item.num >= 1) {
              new_item.num -= 1;
            } else {
              new_item.num = 0;
            }
          } else {
            let car_list = this.data.car_list;
            let total_number = car_list.reduce((total, item) => {
              return total + item.num
            }, 0)

            if (total_number == this.data.store_info.limit_num) {
              dd.showToast({
                type: 'none',
                content: `最多只能选${this.data.store_info.limit_num}个菜哦～`,
                duration: 2000,
              });
              is_add = false;
              return;
            }
            new_item.num += 1;
          }
        }
      }
    });
    if (is_add) {
      this.setData({
        total_price: 0,
        menu_list: new_menu_list
      })
      //处理购物车
      this.getTotalPrice();
    }
  },
  //处理购物车
  getTotalPrice() {
    var car_list = [];
    var total_price = 0;
    this.data.menu_list.map(item => {
      if (item.num > 0) {
        car_list.push(item);
        total_price += item.num * parseFloat(item.dishes_price);
      }
    })
    this.setData({
      car_list: car_list,
      total_price: total_price.toFixed(2)
    })
    if (this.data.showModel == true && car_list.length == 0) {
      this.setData({
        showModel: false
      })
    }
  },
  //切换购物车商品数量
  checkNum(v) {
    let id = v.target.dataset.id;
    let type = v.target.dataset.type;
    //点击某一个菜品的加或减
    this.checkFn(id, type);
  },
  //切换购物车列表的显示和隐藏
  checkShowCar() {
    if (this.data.showModel == true) {
      this.setData({
        showModel: false
      })
    } else {
      if (this.data.car_list.length > 0) {
        this.setData({
          showModel: true
        })
      } else {
        dd.showToast({
          type: 'none',
          content: '购物车内还没有菜品哦～',
          duration: 2000,
        });
      }
    }
  },
  //清除购物车
  clearShopCar() {
    dd.confirm({
      title: '温馨提示',
      content: '确认清除购物车内所有菜品?',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          this.checkFn('1', '1', 'clear');
        }
      },
    });
  },
  //点击去结算
  confirmOrder() {
    if (this.data.car_list.length == 0) {
      dd.showToast({
        type: 'none',
        content: '购物车内还没有菜品哦～',
        duration: 2000,
      });
    } else {
      let car_list = this.data.car_list;
      let total_price = car_list.reduce((total, item) => {
        return total + item.num * item.dishes_price
      }, 0)
      //最低消费限制
      if (total_price < this.data.store_info.min_limit_money) {
        dd.showToast({
          type: 'none',
          content: `最低消费不少于${this.data.store_info.min_limit_money}元～`,
          duration: 2000,
        });
      } else {
        let car_info = {
          address_type: this.data.address_list[this.data.address_index].id,
          address_text:this.data.address_list[this.data.address_index].name,
          day: this.data.set_date,
          type: this.data.meal_list[this.data.index].id,
          type_text:this.data.meal_list[this.data.index].name,
        }
        car_info.total_price = this.data.total_price;
        //将当前页面的内容保存到公共区域
        getApp().globalData.car_info = {
          info: car_info,
          list: this.data.car_list
        };
        dd.navigateTo({
          url: '/page/user/confirm_order/confirm_order?store_id=' + this.data.store_id
        })
      }
    }
  }
});