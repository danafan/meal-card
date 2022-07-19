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
    //用户点击菜品加减
    checkmenu(v){
      let type = v.target.dataset.type;
      this.props.onCheckFn(this.props.item.id,type);
    },
    //商家点击编辑菜品
    onEdit(v){
      this.props.onEdit(v.target.dataset.id);
    },
    //点击删除某一个菜品
    onDelete(v){
      this.props.onDelete(v.target.dataset.id,v.target.dataset.name);
    }
  },
});
