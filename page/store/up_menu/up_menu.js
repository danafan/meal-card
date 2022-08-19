const resource = require('../../../utils/api.js').API;
Page({
  data: {
    active_index: '0',     //选中的菜单类型
    search_value: "",      //输入的搜索内容
    show_menu_list: [],         //显示的菜单
    menu_list: [],         //菜单
    number: 0,              //已选中的上架数量
    up_menu_list: [],      //已上架列表
    timer: null,           //防抖计时器
    show_message: false,   //保存弹窗
    message_type: '1',     //弹窗类型（1:上架；2:下架）
    message_text: "",      //弹窗内容
    day: "",               //送餐日期
    type: 1,               //1:午餐；2:晚餐
    dishes_ids: [],        //批量上架选中的菜品ID列表
    dishes_id: "",         //单个下架选中的菜品ID

  },
  //切换顶部筛选条件
  onChange(v) {
    this.setData({
      page: 1,
      menu_list: [],
      day: v.day,
      type: v.type
    })
    if (v.is_request == '1') {    //重新请求
      //获取已上架的菜单列表
      this.getMenuInfo();
      //获取未上架菜品列表
      this.offDishesList();
    }
  },
  //切换菜单类型
  checkType(e) {
    this.setData({
      page: 1,
      menu_list: [],
      active_index: e.target.dataset.index
    })
    if (this.data.active_index == '0') {
      this.setData({
        search_value: "",
        number: 0
      })
      //获取未上架菜品列表
      this.offDishesList();
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
  //清空搜索内容
  clearValue() {
    this.setData({
      search_value: ''
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
        //过滤
        this.filterMenu();
      }, 1000)
    })
  },
  //过滤
  filterMenu() {
    let arr = this.data.menu_list.filter(item => {
      return item.dishes_name.indexOf(this.data.search_value) > -1;
    });
    this.setData({
      show_menu_list: arr
    })
  },
  //获取未上架菜品列表
  offDishesList() {
    let arg = {
      day: this.data.day,
      type: this.data.type
    }
    resource.offDishesList(arg).then(res => {
      this.setData({
        show_menu_list: res.data,
        menu_list: res.data
      })
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
    let arr = new_menu_list.filter(item => {
      return item.is_checked == true;
    })
    this.setData({
      number: arr.length,
      menu_list: new_menu_list
    })
    //过滤
    this.filterMenu();
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
          this.setData({
            search_value: "",
            number: 0
          })
          //获取列表
          this.offDishesList();
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
