Component({
  mixins: [],
  data: {},
  props: {
    type: "",    //add_menu:‘用户点餐’;menu_management:'上架菜品管理';up_menu:'商家上传菜品菜单列表';down_menu:'上架下架菜品'
    item: {},    //某一个菜品
    index: 0,    //点击的下标
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    //图片放大
    viewImage() {
      let urls = [this.props.item.domain + this.props.item.image];
      dd.previewImage({
        urls: urls
      });
    },
    //商家设置默认菜品
    setDefaultDishes(e) {
      let status = e.target.dataset.status;
      let arg = {
        id: this.props.item.dishes_id,
        status: status
      }
      this.props.onGetData(arg);
    },
    //用户点击菜品加减
    checkMenu(v) {
      let type = v.target.dataset.type;
      this.props.onCheckFn(this.props.item.dishes_id, type);
    },
    //商家点击编辑菜品
    onEdit() {
      this.props.onEdit(this.props.item.dishes_id);
    },
    //点击删除某一个菜品
    onDelete() {
      this.props.onDelete(this.props.item.dishes_id, this.props.item.dishes_name);
    },
    //商家点击某一个菜品(商家上传菜品菜单选择)
    changeMenu() {
      if (this.props.type == 'up_menu') {
        this.props.onChecked(this.props.item.dishes_id)
      }
    },
    //下架菜品
    downMenu() {
      this.props.onShelves(this.props.item)
    }
  },
});
