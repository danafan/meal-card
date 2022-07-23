const resource = require('../../../utils/api.js').API;
Page({
  data: {
    active_index: '0',     //选中的菜单类型
    search_value: "",      //输入的搜索内容
    page: 1,               //页码
    isLoad: true,
    menu_list: [],         //菜单
    up_menu_list: [],      //已上架列表
    timer: null,           //防抖计时器
    show_message: false,   //保存弹窗
    message_type: '1',      //弹窗类型（1:上架；2:下架）
    message_text: "",      //弹窗内容
    day: "",
    type: 1,
    dishes_ids: [],       //批量上架选中的菜品ID列表
    dishes_id: "",         //单个下架选中的菜品ID

  },
  onLoad() {
    //获取菜品列表
    this.getMenuList();
  },
  //切换顶部筛选条件
  onChange(v) {
    this.setData({
      day: v.day,
      type: v.type
    })
    if (v.is_request == '1') {    //重新请求
      //获取已上架的菜单列表
      this.getMenuInfo();
    }
  },
  //切换菜单类型
  checkType(e) {
    this.setData({
      active_index: e.target.dataset.index
    })
    if (this.data.active_index == '0') {
      //处理菜单列表已选中状态
      this.handleStatus();
    } else {
      //获取已上架的菜单列表
      this.getMenuInfo();
    }
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
  //获取菜品列表
  getMenuList() {
    let arg = {
      name: this.data.search_value,
      page: this.data.page,
      pagesize: 10
    }
    resource.getMenuList(arg).then(res => {
      let data = res.data;
      let arr = data.data;    //菜单列表
      //处理菜单列表已选中状态
      this.handleStatus(arr);
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
  //获取已上架的菜单列表
  getMenuInfo() {
    let arg = {
      day: this.data.day,
      type: this.data.type
    }
    resource.getMenuInfo(arg).then(res => {
      let data = res.data;
      if (data.length == 0) {
        this.setData({
          up_menu_list: []
        })
      } else {
        this.setData({
          up_menu_list: data.list
        })
      }
      //处理菜单列表已选中状态
      this.handleStatus();
    });
  },
  //处理菜单列表已选中状态
  handleStatus(arr) {
    let new_menu_list = arr ? arr : this.data.menu_list;
    let menu_list = JSON.parse(JSON.stringify(new_menu_list));
    menu_list.map(item => {
      let list = this.data.up_menu_list.filter(i => {
        return item.dishes_id == i.dishes_id;
      })
      if (list.length > 0) {
        item.is_checked = true;
      } else {
        item.is_checked = false;
      }
    })
    this.setData({
      menu_list: arr ? this.data.menu_list.concat(Array.from(menu_list)) : menu_list
    });
  },
  //切换菜单列表选中状态
  onChecked(id) {
    let new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
    new_menu_list.map(item => {
      if (item.dishes_id == id) {
        item.is_checked = !item.is_checked;
      }
    })
    this.setData({
      menu_list: new_menu_list
    })
  },
  //下架
  onShelves(v) {
    this.setData({
      dishes_id: v.dishes_id,
      message_text: `确认下架${v.dishes_name}？`,
      show_message: true,
      message_type: '2'
    })
  },
  //点击上架
  save() {
    let name_list = [];
    let dishes_ids = [];
    this.data.menu_list.map(item => {
      if (item.is_checked) {
        name_list.push(item.dishes_name);
        dishes_ids.push(item.dishes_id);
      }
    })
    if (dishes_ids.length == 0) {
      dd.showToast({
        type: 'none',
        content: '您还没有选择菜品哦～',
        duration: 2000
      });
      return;
    };
    this.setData({
      dishes_ids: dishes_ids,
      message_text: `${this.data.day}上架${this.data.type == '1' ? '午餐' : '晚餐'}：${name_list.join(',')}.`,
      show_message: true,
      message_type: '1'
    })
  },
  //弹窗按钮
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      if (this.data.message_type == '1') {    //上架
        var arg = {
          day: this.data.day,
          type: this.data.type,
          dishes_ids: this.data.dishes_ids.join(',')
        }
        resource.addMenu(arg).then(res => {
          dd.showToast({
            type: 'none',
            content: '上架成功',
            duration: 2000
          });
        });
      } else {    //下架
        var arg = {
          day: this.data.day,
          type: this.data.type,
          dishes_id: this.data.dishes_id
        }
        resource.shelvesMenu(arg).then(res => {
          dd.showToast({
            type: 'none',
            content: '已下架',
            duration: 2000
          });
          let new_up_menu_list = JSON.parse(JSON.stringify(this.data.up_menu_list));
          let index = new_up_menu_list.findIndex(item => {
            return item.dishes_id == this.data.dishes_id;
          })
          new_up_menu_list.splice(index, 1);
          this.setData({
            up_menu_list: new_up_menu_list
          })
        });
      }
      this.setData({
        show_message: false
      })
    } else {
      this.setData({
        show_message: false
      })
    }
  }
});
