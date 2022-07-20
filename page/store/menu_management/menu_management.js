const resource = require('../../../utils/api.js').API;
let app = getApp();
Page({
  data: {
    id: "",                            //点击删除的ID
    index:0,                        //点击删除的下标
    page: 1,                        //页码
    isLoad: true,
    menu_list: [],                  //菜单
    show_message: false,             //删除弹窗
    message_text: ""
  },
  onShow() {
    this.setData({
      page: 1,
      isLoad: true,
      menu_list: [],                  //菜单
      show_message: false,             //删除弹窗
      message_text: ""
    })
    //获取列表
    this.getMenuList()
  },
  //上拉加载
  loadMore(e) {
    if (this.data.isLoad == false) {
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
    //获取列表
    this.getMenuList()
  },
  //获取菜单列表
  getMenuList() {
    let arg = {
      page: this.data.page,
      pagesize: 10
    }
    resource.getMenuList(arg).then(res => {
      let data = res.data;
      this.setData({
        menu_list: this.data.menu_list.concat(Array.from(data.data))
      });
      if (data.last_page == this.data.page) {
        this.setData({
          isLoad: false
        })
      } else {
        this.setData({
          isLoad: true
        })
      }
    });
  },
  //点击某一条的编辑
  onEdit(id) {
    dd.navigateTo({
      url: '/page/store/create_menu/create_menu?id=' + id
    })
  },
  //点击新增菜品
  addmenu() {
    dd.navigateTo({
      url: '/page/store/create_menu/create_menu'
    })
  },
  //点击某一条的删除
  onDelete(id, name,index) {
    this.setData({
      message_text: `确定要把${name}从列表中删除吗?`,
      id: id,
      index:index,
      show_message: true
    })
  },
  //删除
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      let arg = {
        id: this.data.id
      }
      resource.deleteMenu(arg).then(res => {
        dd.showToast({
          type: 'none',
          content: '已删除',
          duration: 2000
        });
        let new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
        new_menu_list.splice(this.data.index,1);
        this.setData({
          show_message: false,
          menu_list: new_menu_list
        })
      });
    } else {
      this.setData({
        show_message: false
      })
    }
  }
});
