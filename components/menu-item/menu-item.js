Component({
  mixins: [],
  data: {},
  props: {
    type:"",    //add_menu:‘用户点餐’,
    item:{},    //某一个菜品
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    //点击添加菜品
    addmenu(){
      this.props.onAddFn(this.props.item);
    }
  },
});
