Component({
  mixins: [],
  data: {},
  props: {
    result_type: '',     //支付结果页面的结果类型（0:空；1:成功）
    toast_text: "",      //提示
    show_back: "",       //不为空则显示返回按钮
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
    scanFn(){
      console.log('继续扫码')
    }
  },
});
