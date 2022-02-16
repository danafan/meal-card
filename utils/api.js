let app = getApp();
const GET = 'GET';
const POST = 'POST';

const baseUrl = "https://house.92nu.com/user/";       //请求地址

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
      success(res) {
        //请求成功
        if (res.data.status == 1) {
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
  getUserInfo: (data) => request(GET, 'login/login', data),         //获取用户信息
  getCardInfo: (data) => request(GET, 'card/getcardinfo', data),    //获取餐卡信息
  getQrCode: (data) => request(GET, 'card/getpaymentcode', data),   //获取付款码
  userCardRecord: (data) => request(GET, 'card/getcardrecord', data),   //员工账单s
  storePayment: (data) => request(POST, 'store/payment', data),         //商家扫码提交
  getStoreRecord: (data) => request(GET, 'store/getstorerecord', data),         //商家账单
  getRefundReason: (data) => request(GET, 'store/getrefundreason', data),         //获取退款原因
  refundMoney: (data) => request(POST, 'store/refund', data),         //退款
};
module.exports = {
  API: API
}