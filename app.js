App({
  globalData: {
    wsUrl:"ws://119.3.36.232:9777",                 //websocket链接地址
    uploadUrl: "http://test_sample.92nu.com/",      //上传图片地址
    userUrl:"https://house.92nu.com/user/",         //获取付款码域名
    user_info:{
      user_type:1
    },                                 //用户信息
    token:"",
    address_list:[{
      id:'1',
      name:'大王椰'
    },{
      id:'2',
      name:'国泰'
    }],                           //送餐地址列表
    car_info:{},                  //订单内容内容
  },
});