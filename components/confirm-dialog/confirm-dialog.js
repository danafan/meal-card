Component({
  props: {
    title:'',
    content_1:'',
    content_2:'',
    onConfirmFun:() => {}
  },
  methods: {
    //点击确定
    confirm(){
      this.props.onConfirmFun();
    }
  },
});
