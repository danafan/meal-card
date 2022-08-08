const resource = require('../../../utils/api.js').API;
Page({
  data: {
    menu_list: [],         //菜单列表
    showModel: false,      //购物车弹窗
    car_list: [],          //购物车菜单
    total_price: 0,        //购物车总金额
    arg: {},               //顶部传回来的数据
    no_click: false,       //去结算按钮是否可点击
  },
  //切换顶部选项
  onChange(arg) {
    this.setData({
      arg: arg
    })
    //判断是否请求
    if (arg.is_request == '1') {
      //获取菜单列表
      this.userMenuList(arg);
    }
    //判断去结算按钮是否置灰
    let current_date = arg.day + ' ' + arg.end_time;
    this.setData({
      no_click: new Date().getTime() > Date.parse(current_date.replace(/-/g, '/'))
    })
  },
  //获取菜单列表
  userMenuList(arg) {
    let req = {
      day: arg.day,
      type: arg.type
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
    });
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
            //菜品数量限制
            if (total_number == getApp().globalData.limit_num) {
              dd.showToast({
                type: 'none',
                content: `最多只能选${getApp().globalData.limit_num}个菜哦～`,
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
      if (total_price < getApp().globalData.min_price) {
        dd.showToast({
          type: 'none',
          content: `最低消费不少于${getApp().globalData.min_price}元～`,
          duration: 2000,
        });
      } else {
        let car_info = this.data.arg;
        car_info.total_price = this.data.total_price
        //将当前页面的内容保存到公共区域
        getApp().globalData.car_info = {
          info: car_info,
          list: this.data.car_list
        };
        dd.navigateTo({
          url: '/page/user/confirm_order/confirm_order'
        })
      }
    }
  }
});
