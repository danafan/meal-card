const resource = require('../../utils/api.js').API;
Page({
  data: {
    user_type: '',    //1:用户；2:商家
  },
  onLoad() {
    //钉钉获取用户信息
    this.getDingInfo();
    //获取送餐地址
    this.ajaxAddress();
    return;
    
    const updateManager = dd.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function(ret) {
          dd.confirm({
            title: '更新提示',
            content: `新版本${ret.version}已经准备好，是否更新并重启应用？`,
            confirmButtonText: '现在更新',
            cancelButtonText: '再等等',
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
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
      getApp().globalData.lunch_date = res.config.lunch;
      getApp().globalData.dinner_date = res.config.dinner;
      getApp().globalData.limit_num = parseInt(res.config.limit_num);
      this.setData({
        user_type: res.user_type
      })
      if(res.user_type == '1'){
        this.getNotice();
      }
    })
  },
  getNotice(){
    resource.getNotice().then(res => {
      console.log(res.data)
      // if(res.data){
      //   dd.confirm({
      //   title: '更新提示',
      //   content: `新版本${ret.version}已经准备好，是否更新并重启应用？`,
      //   confirmButtonText: '现在更新',
      //   cancelButtonText: '再等等',
      //   success: function(res) {
      //     if (res.confirm) {
      //       updateManager.applyUpdate()
      //     }
      //   }
      // })
      // }
    })
  },
  //获取送餐地址
  ajaxAddress() {
    resource.ajaxAddress().then(res => {
      getApp().globalData.address_list = res.data;
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
  },
  //扫码确认
  scanConfirm() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        dd.navigateTo({
          url: '/page/store/confirm_order/confirm_order?code=' + res.code
        })
      }
    })

  },



})