Component({
  props: {
    title:'',
    content_1:'',
    content_2:''
  },
  methods: {
    //点击确定
    confirm(){
      this.props.onConfirmFun();
    }
  },
});
