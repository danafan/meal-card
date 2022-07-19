Component({
  mixins: [],
  data: {},
  props: {
    message_text:'',      //提示内容
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    //确认按钮
    tapFn(v){
      this.props.onTapFn(v.target.dataset.type);
    }
  },
});
