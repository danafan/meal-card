Component({
  mixins: [],
  data: {},
  props: {
    page_type: 'choose_menu',  //使用页面
    total_price: 0,      //总价
    no_click: false,     //去结算按钮是否可点击
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 点击购物车按钮
    checkShowCar() {
      if (this.props.page_type == 'choose_menu') {
        this.props.onCheckShowCar();
      }
    },
    //去结算
    confirmOrder() {
      if (this.props.no_click) {
        dd.showToast({
          type: 'none',
          content: '当前时间已大于送餐日期订单截止时间！',
          duration: 2000,
        });
        return;
      }
      this.props.onConfirmOrder();
    },
    //免密支付
    paybalFn() {
      this.props.onPaybalFn();
    }
  },
});
