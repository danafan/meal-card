const resource = require('../../utils/api.js').API;
Component({
  mixins: [],
  data: {},
  props: {
    result_type: '',     //支付结果页面的结果类型（0:空；1:成功；2:失败）
    toast_text: "",      //提示
    show_back: "",       //不为空则显示返回按钮
    show_scan: '',        //不为空则显示继续扫码按钮
    show_index: '',        //不为空则显示返回首页按钮
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    //返回
    goBack() {
      dd.navigateBack({
        delta: 1
      })
    },
    //继续扫码
    scanFn() {
      dd.scan({
        type: 'qr',
        success: (res) => {
          let code = res.code;
          let arg = {
            code: code
          }
          resource.getOrderInfo(arg).then(res => {
            if (res.code == 1) {
              dd.navigateTo({
                url: '/page/store/confirm_order/confirm_order?code=' + code
              })
            }
          })
        }
      })
    },
    //返回首页
    goIndex() {
      dd.redirectTo({
        url: '/page/index/index?is_empty=1'
      })
    }
  },
});
