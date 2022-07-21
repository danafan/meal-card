let app = getApp();
const GET = 'GET';
const POST = 'POST';

// const baseUrl = "https://house.92nu.com/user/";       //请求地址
const baseUrl = "http://test_sample.92nu.com/user/";       //请求地址

function request(method, url, data) {
  var data = data ? data : {};
  if (app.globalData.token) {
    data.token = app.globalData.token;
  }
  dd.showLoading({
    content: '加载中...',
  });
  return new Promise(function(resolve, reject) {
    let header = {
      'content-type': 'application/json',
    };
    dd.httpRequest({
      url: baseUrl + url,
      method: method,
      data: data,
      header: header,
      success:(res) => {
        //请求成功
        if (res.data.status == 1 || res.data.code == 1) {
          resolve(res.data);
          dd.hideLoading();
        } else {
          dd.showToast({
            type: 'none',
            content: res.data.msg,
            duration: 2000
          });
        }
      },
    })
  })
}
const API = {
  uploadUrl:"http://test_sample.92nu.com/",
  getUserInfo: (data) => request(GET, 'login/login', data),         //获取用户信息
  getCardInfo: (data) => request(GET, 'card/getcardinfo', data),    //获取餐卡信息
  getQrCode: (data) => request(GET, 'card/getpaymentcode', data),   //获取付款码
  userCardRecord: (data) => request(GET, 'card/getcardrecord', data),   //员工账单
  storePayment: (data) => request(POST, 'store/payment', data),         //商家扫码提交
  getStoreRecord: (data) => request(GET, 'store/getstorerecord', data),         //商家账单
  getRefundReason: (data) => request(GET, 'store/getrefundreason', data),         //获取退款原因
  refundMoney: (data) => request(POST, 'store/refund', data),         //退款
  getMenuList: (data) => request(GET, 'store/dishes_list', data),         //获取所有菜品列表
  createMenu: (data) => request(POST, 'store/add_dishes', data),         //创建菜品
  menuDetail: (data) => request(GET, 'store/edit_dishes', data),         //菜品详情
  editMenu: (data) => request(POST, 'store/edit_dishes', data),         //编辑菜品
  deleteMenu: (data) => request(POST, 'store/del_dishes', data),         //删除菜品
  getMenuInfo: (data) => request(GET, 'store/get_menu_info', data),         //已上架的菜单列表
  addMenu: (data) => request(POST, 'store/add_menu', data),         //创建菜单
  editMenu: (data) => request(POST, 'store/edit_menu', data),         //编辑菜单
  storeOrderTotal: (data) => request(GET, 'store/order_total', data),         //商家订单页头部列表
  storeOrderDishesList: (data) => request(GET, 'store/order_dishes_list', data),         //商家订单页底部列表
  userMenuList: (data) => request(GET, 'meal/get_menu', data),         //用户获取菜单
  userCreateOrder: (data) => request(POST, 'meal/order', data),         //用户下单
  userOrderList: (data) => request(GET, 'meal/get_order_list', data),         //用户订单列表
  getMealCode: (data) => request(GET, 'meal/get_meal_code', data),         //用户获取取餐码


  
  
  

};
module.exports = {
  API: API
}