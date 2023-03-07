const resource = require('../../../utils/api.js').API;
Page({
  data: {
    search_value: "",      //搜索的内容
    store_list: [],        //商家列表
  },
  onLoad() {
    //获取公告
    this.getNotice();
    //获取菜单列表
    this.userMenuList();
  },
  //获取公告
  getNotice() {
    resource.getNotice().then(res => {
      if (res.data) {
        dd.alert({
          title: res.data.notice_title,
          content: res.data.content,
          buttonText: '我知道了'
        });
      }
    })
  },
  //监听搜索的内容
  changeSearch(v) {
    this.setData({
      search_value: v.detail.value
    })
  },
  //获取菜单列表
  userMenuList() {
    let arg = {
      search: this.data.search_value
    }
    resource.getStoreList(arg).then(res => {
      let data = res.data;
      this.setData({
        store_list: data
      })
    });
  },
  //点击跳转选择菜品
  chooseMenu(v) {
    let id = v.target.dataset.id;
    dd.navigateTo({
      url: '/page/user/choose_menu/choose_menu?store_id=' + id
    })
  }
});
