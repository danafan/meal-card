App({
  globalData: {
    wsUrl:"ws://119.3.36.232:9777",                 //websocket链接地址
    user_info:{
      user_type:1
    },                                              //用户信息
    token:"",
    address_list:[{
      id:'1',
      name:'大王椰'
    },{
      id:'2',
      name:'国泰'
    }],                                             //送餐地址列表
    car_info:{},                                    //用户购物车内容（下单跳转到确认订单时使用）
    lunch_date:'11:00:00',                          //商家午餐和晚餐的截止时间
    dinner_date:'17:00:00', 
    limit_num:4,                                    //每单可以点几个菜
  },
});