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
    //点击添加或删除菜品
    checkmenu(v){
      let type = v.target.dataset.type;
      this.props.onCheckFn(this.props.item.id,type);
    }
  },
});
