Page({
  data: {
    menu_list: [{
      id: '1',
      name: '鱼香肉丝',
      num: 0,
      price: 12
    }, {
      id: '2',
      name: '红烧肉',
      num: 0,
      price: 18
    }, {
      id: '3',
      name: '四喜丸子',
      num: 0,
      price: 22
    }, {
      id: '4',
      name: '酱香猪蹄',
      num: 0,
      price: 32
    }, {
      id: '5',
      name: '烧花鸭',
      num: 0,
      price: 36
    }],                   //菜单
    show_message:false,   //删除弹窗
    message_text:""
  },
  onLoad() { },
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
  onDelete(id, name) {
    this.setData({
      message_text:`确定要把${name}从列表中删除吗?`,
      show_message:true
    })
  },
   //弹窗按钮
  onTapFn() { //0:否；1:是
    this.setData({
      show_message:false
    })
  }
});
