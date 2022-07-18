const resource = require('../../utils/api.js').API;
Page({
  data: {
    user_type: 1,    //1:用户；商家
  },
  onLoad() {
    // this.setData({
    //   user_type: 1
    // })
    dd.navigateTo({
        url: '/page/user/user_order/user_order'
      })
    //钉钉获取用户信息
    // this.getDingInfo();
  },
  //钉钉获取用户信息
  getDingInfo() {
    dd.getAuthCode({
      success: (res) => {
        this.getUserinfo(res.authCode);
      }
    })
  },
  //获取用户信息
  getUserinfo(authCode) {
    resource.getUserInfo({
      code: authCode
    }).then(res => {
      getApp().globalData.user_info = res.data;
      getApp().globalData.token = res.token;
      this.setData({
        user_type: res.user_type
      })
    })
  },
  //付款码或商家收款
  fkmFn() {
    if (this.data.user_type == '1') {
      dd.navigateTo({
        url: '/page/user/index/index'
      })
    } else {
      dd.navigateTo({
        url: '/page/store/index/index'
      })
    }
  },
  //跳转账单
  goBill() {
    if (this.data.user_type == '1') {
      dd.navigateTo({
        url: '/page/user/user_bill/user_bill'
      })
    } else {
      dd.navigateTo({
        url: '/page/store/store_bill/store_bill'
      })
    }
  },
  //点餐/上架菜品
  dcFn() {
    if (this.data.user_type == '1') {
      dd.navigateTo({
        url: '/page/user/choose_menu/choose_menu'
      })
    } else {
      dd.navigateTo({
        url: '/page/store/up_menu/up_menu'
      })
    }
  },
  //订单
  orderFn() {
    if (this.data.user_type == '1') {
      dd.navigateTo({
        url: '/page/user/user_order/user_order'
      })
    } else {
      dd.navigateTo({
        url: '/page/store/store_order/store_order'
      })
    }
  },
  //商家菜单管理
  menuFn() {
    dd.navigateTo({
      url: '/page/store/menu_management/menu_management'
    })
  }

})