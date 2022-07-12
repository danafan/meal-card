Page({
  data: {
    menu_list: [{
      id: '1',
      name: '鱼香肉丝',
      price: 12
    }, {
      id: '2',
      name: '红烧肉',
      price: 18
    }, {
      id: '3',
      name: '四喜丸子',
      price: 22
    }, {
      id: '4',
      name: '酱香猪蹄',
      price: 32
    }, {
      id: '5',
      name: '烧花鸭',
      price: 36
    }],                   //菜单
    showModel: false,      //购物车弹窗
    car_list: [],          //购物车菜单
    total_price:0,        //购物车总金额
  },
  onLoad() { },
  //点击某一个菜品的添加
  addFn(item) {
    let have_list = this.data.car_list.filter(car_item => {
      return car_item.id == item.id;
    })
    if (have_list.length == 0) {
      item.num = 1;
      this.data.car_list.push(item)
    } else {
      this.data.car_list.map(car_item => {
        if (car_item.id == item.id) {
          car_item.num += 1;
        }
      });
    }
    //计算购物车总金额
    this.getTotalPrice();
  },
  //计算购物车总金额
  getTotalPrice(){
    this.data.car_list.map(item => {
      this.setData({
        total_price:item.num*item.price
      })
      
    })
  } 
});
