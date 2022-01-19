let app = getApp();
Page({
  data: {

  },
  onLoad() {

  },
  goUserIndex() {
    dd.navigateTo({
      url: '/page/user/index/index'
    })
  },
  goStoreIndex() {
    dd.navigateTo({
      url: '/page/store/index/index'
    })
  }
})