Page({
  data: {
    active_index:'0',     //选中的菜单类型
    search_value:"",      //输入的搜索内容
    menu_list: [{
      id: '1',
      name: '鱼香肉丝',
      num: 0,
      is_checked:false,
      price: 12
    }, {
      id: '2',
      name: '红烧肉',
      num: 0,
      is_checked:false,
      price: 18
    }, {
      id: '3',
      name: '四喜丸子',
      num: 0,
      is_checked:false,
      price: 22
    }, {
      id: '4',
      name: '酱香猪蹄',
      num: 0,
      is_checked:false,
      price: 32
    }, {
      id: '5',
      name: '烧花鸭',
      num: 0,
      is_checked:false,
      price: 36
    }],                   //菜单
    up_menu_list:[],      //已上架列表
  },
  onLoad() {},
  //切换菜单类型
  checkType(e){
    this.setData({
      active_index: e.target.dataset.index
    })
    console.log(this.data.up_menu_list);
  },
  //监听搜索的内容
  changeSearch(v){
    this.setData({
      search_value:v.detail.value
    })
  },
  //上架选中了某个菜品（上架菜单选择）
  onChecked(id){
    let new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
    var new_up_menu_list = JSON.parse(JSON.stringify(this.data.up_menu_list));    //已上架的商品列表
    new_menu_list.map(item => {
      if(item.id == id){
        item.is_checked = !item.is_checked;
        //处理已上架商品列表
        if(item.is_checked){
          new_up_menu_list.push(item);
        }
      }
    })
    this.setData({
      menu_list:new_menu_list,
      up_menu_list:new_up_menu_list
    })
  },
  //点击下架
  onDownMenu(id){
    console.log(id);
    let new_up_menu_list = JSON.parse(JSON.stringify(this.data.up_menu_list));   //已上架的商品列表
    new_up_menu_list.map((item,index) => {
      if(item.id == id){
        new_up_menu_list.splice(index,1);
      }
    })
    this.setData({
      up_menu_list:new_up_menu_list
    })
  },
  //保存
  save(){

  }
});
