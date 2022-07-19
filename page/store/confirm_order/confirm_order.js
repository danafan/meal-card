Page({
  data: {},
  onLoad() { },
  //点击确认取餐
  confirmGet() {
    dd.redirectTo({
      url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=确认成功&show_scan=1'
    })
  }
});
