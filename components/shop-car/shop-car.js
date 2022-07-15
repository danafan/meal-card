Component({
  mixins: [],
  data: {},
  props: {
    page_type:'choose_menu',  //使用页面
    total_price:0,      //总价
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 点击购物车按钮
    checkShowCar(){
      if(this.props.page_type == 'choose_menu'){
        this.props.onCheckShowCar();
      }
    },
    //去结算
    confirmOrder(){
      this.props.onConfirmOrder();
    },
    //免密支付
    paybalFn(){
      this.props.onPaybalFn();
    }
  },
});
