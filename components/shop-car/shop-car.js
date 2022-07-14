Component({
  mixins: [],
  data: {},
  props: {
    total_price:0,      //总价
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 点击购物车按钮
    checkShowCar(){
      this.props.onCheckShowCar();
    }
  },
});
