const resource = require('../../utils/api.js').API;
Page({
  data: {

  },
  onLoad() {
    //钉钉获取用户信息
    this.getDingInfo();
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
      if (res.user_type == 1) { //用户
        dd.redirectTo({
          url: '/page/user/index/index'
        })
      } else {          //商家
        dd.redirectTo({
          url: '/page/store/index/index'
        })
      }
    })
  },

})