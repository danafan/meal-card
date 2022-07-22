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
    message_text: "",      //弹窗内容
    day: "",
    type: 1,
    end_time: "",
    menu_id: "",
    dishes_ids: []
  },
  onLoad() {
    //获取菜品列表
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
  onChange(v) {
    this.setData({
      day: v.day,
      type: v.type,
      end_time: v.end_time
    })
    if (v.is_request == '1') {    //重新请求
      //获取已上架的菜单列表
      this.getMenuInfo()
    }
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
      arr.map(item => {
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
          menu_id: '',
          up_menu_list: [],
          end_time: '选择时间'
        })
      } else {
        this.setData({
          menu_id: data.menu_info.menu_id,
          up_menu_list: data.list,
          end_time: data.menu_info.end_time
        })
      }
      let menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
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
        menu_list: menu_list
      });
    });
  },
  //上架或下架
  onChecked(id) {
    let new_menu_list = JSON.parse(JSON.stringify(this.data.menu_list));
    var new_up_menu_list = JSON.parse(JSON.stringify(this.data.up_menu_list));    //已上架的商品列表
    //判断已上架的菜品是否存在于菜单列表（当前列表未加载问题）
    let contains_list = new_menu_list.filter(iii => {
      return iii.dishes_id == id;
    })
    if (contains_list.length > 0) {
      new_menu_list.map(item => {
        if (item.dishes_id == id) {
          item.is_checked = !item.is_checked;
          //处理已上架商品列表
          if (item.is_checked) {
            new_up_menu_list.push(item);
          } else {
            let index = new_up_menu_list.findIndex(item => item.dishes_id == id);
            new_up_menu_list.splice(index, 1);
          }
        }
      })
    } else {
      let index = new_up_menu_list.findIndex(item => item.dishes_id == id);
      new_up_menu_list.splice(index, 1);
    }
    this.setData({
      menu_list: new_menu_list,
      up_menu_list: new_up_menu_list
    })
  },
  //保存
  save() {
    if (this.data.up_menu_list.length == 0) {
      dd.showToast({
        type: 'none',
        content: '您还没有选择菜品哦～',
        duration: 2000
      });
      return;
    };
    if (this.data.end_time == '选择时间') {
      dd.showToast({
        type: 'none',
        content: '请选择订餐截止时间！',
        duration: 2000
      });
      return;
    }
    let name_list = [];
    let dishes_ids = [];
    this.data.menu_list.map(item => {
      if (item.is_checked) {
        name_list.push(item.dishes_name);
        dishes_ids.push(item.dishes_id);
      }
    })

    this.setData({
      dishes_ids: dishes_ids,
      message_text: `${this.data.day}上架${this.data.type == '1' ? '午餐' : '晚餐'}：${name_list.join(',')}.`,
      show_message: true
    })
  },
  //弹窗按钮
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      var arg = {
        day: this.data.day,
        type: this.data.type,
        end_time: this.data.end_time,
        dishes_ids: this.data.dishes_ids.join(',')
      }
      if (this.data.menu_id == '') {
        resource.addMenu(arg).then(res => {
          dd.showToast({
            type: 'none',
            content: '上架成功',
            duration: 2000
          });
          this.setData({
            show_message: false
          })
        });
      } else {
        arg.menu_id = this.data.menu_id;
        resource.editMenu(arg).then(res => {
          dd.showToast({
            type: 'none',
            content: '编辑成功',
            duration: 2000
          });
          this.setData({
            show_message: false
          })
        });
      }
    } else {
      this.setData({
        show_message: false
      })
    }
  }
});
