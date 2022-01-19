Component({
  mixins: [],
  data: {},
  props: {
    userType:'1',   //1:员工；2:商家
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    //点击退款
    refund(){
      this.props.onRefundFun();
    }
  },
});
