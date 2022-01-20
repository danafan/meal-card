Component({
  mixins: [],
  data: {},
  props: {
    userType:'1',   //1:员工；2:商家
    itemInfo:{},    
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    //点击退款
    refund(e){
      this.props.onRefundFun(e.target.dataset.id,e.target.dataset.amount);
    }
  },
});
