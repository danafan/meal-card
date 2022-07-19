Component({
  mixins: [],
  data: {},
  props: {
    type:"",    //add_menu:‘用户点餐’;menu_management:'上架菜品管理';up_menu:'商家上传菜品菜单列表';down_menu:'上架下架菜品'
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
    },
    //商家点击某一个菜品(商家上传菜品菜单选择)
    changeMenu(){
      if(this.props.type == 'up_menu'){
        this.props.onChecked(this.props.item.id)
      }
    },
    //下架菜品
    downMenu(){
      this.props.onDownMenu(this.props.item.id)
    }
  },
});
