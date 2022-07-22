const resource = require('../../utils/api.js').API;
Component({
  mixins: [],
  data: {},
  props: {
    result_type: '',     //支付结果页面的结果类型（0:空；1:成功）
    toast_text: "",      //提示
    show_back: "",       //不为空则显示返回按钮
    show_scan: '',        //不为空则显示继续扫码按钮
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
          //核销
          this.receiveMeal(res.code);
        }
      })
    },
    //核销
    receiveMeal(code) {
      let arg = {
        code: code
      }
      resource.receiveMeal(arg).then(res => {
        dd.showToast({
          type: 'none',
          content: res.data.msg,
          duration: 2000
        });
      })
    }
  },
});
