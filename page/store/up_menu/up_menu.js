const resource = require('../../../utils/api.js').API;
Page({
  data: {
    active_index: '0',     //选中的菜单类型
    search_value: "",      //输入的搜索内容
    page: 1,                        //页码
    isLoad: true,
    menu_list: [],                   //菜单
    up_menu_list: [],      //已上架列表
    timer: null,          //防抖计时器
    show_message: false,   //保存弹窗
    message_text: "",      //弹窗内容
  },
  onLoad() {
    //获取列表
    this.getMenuList();
  },
  //切换菜单类型
  checkType(e) {
    this.setData({
      active_index: e.target.dataset.index
    })
  },
  //监听搜索的内容
  changeSearch(v) {
    this.setData({
      search_value: v.detail.value
    })
    //处理搜索框输入请求
    this.debounce();
  },
  //处理搜索框输入请求
  debounce() {
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    };
    this.setData({
      timer: setTimeout(() => {
        this.setData({
          page: 1,                       
          isLoad: true,
          menu_list: [],                  
        })
        //获取列表
        this.getMenuList();
      }, 1000)
    })
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
  //切换顶部筛选条件
  onChange(v){
    console.log(v);
  },
  //获取列表
  getMenuList() {
    let arg = {
      name: this.data.search_value,
      page: this.data.page,
      pagesize: 10
    }
    resource.getMenuList(arg).then(res => {
      let data = res.data;
      let arr = data.data;    //菜单列表
      arr.map(item => {
        let list = this.data.up_menu_list.filter(i => {
          return item.dishes_id == i.dishes_id;
        })
        if(list.length > 0){
          item.is_checked = true;
        }else{
          item.is_checked = false;
        }
      })
      this.setData({
        menu_list: this.data.menu_list.concat(Array.from(arr))
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
  //上架或下架
  onChecked(id) {
    let new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
    var new_up_menu_list = JSON.parse(JSON.stringify(this.data.up_menu_list));    //已上架的商品列表
    new_menu_list.map(item => {
      if (item.dishes_id == id) {
        item.is_checked = !item.is_checked;
        //处理已上架商品列表
        if (item.is_checked) {
          new_up_menu_list.push(item);
        }else{
          let index = new_up_menu_list.findIndex(item => item.dishes_id == id);
          new_up_menu_list.splice(index,1);
        }
      }
    })
    this.setData({
      menu_list: new_menu_list,
      up_menu_list: new_up_menu_list
    })
  },
  //保存
  save() {
    console.log(this.data.up_menu_list);
    this.setData({
      message_text: '07月6日上架午餐：阳澄湖大闸蟹、酸菜猪肉炖粉条、剁椒鱼头、三七汽锅鸡、手把羊肉、尖椒干豆腐、小鸡炖蘑菇、红烧蹄膀、豆腐灌蛋、清蒸鲈鱼、拔丝地瓜、重庆辣子鸡.',
      show_message: true
    })
  },
  //弹窗按钮
  onTapFn(type) { //0:否；1:是
    this.setData({
      show_message: false
    })
  }
});
