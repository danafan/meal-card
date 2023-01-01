App({
  globalData: {
    // wsUrl:"ws://119.3.36.232:9777",                 //websocket链接地址
    wsUrl:"ws://101.132.136.202:9777",                 //websocket链接地址
    user_info:{
      user_type:1
    },                                              //用户信息
    token:"",
    address_list:[],                                //送餐地址列表
    car_info:{},                                    //用户购物车内容（下单跳转到确认订单时使用）
  },
});