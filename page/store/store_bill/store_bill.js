Page({
  data: {
    showRefund:false,   //申请退款弹窗
    why_list:[{
      id:'1',
      value:'退款原因1'
    },{
      id:'2',
      value:'退款原因2'
    },{
      id:'2',
      value:'退款原因2'
    }],                 //所有原因列表
    active_index:0,     //选中的下标
  },
  onLoad() {},
  //监听日期切换
  checkDate(date){
    console.log(date)
  },
  //点击退款
  refundFun(){
    this.setData({
      showRefund:true
    })
  },
  //切换原因
  checkWhy(e){
    this.setData({
      active_index:e.target.dataset.index
    })
  },
  //点击退款确定
  confirm(){
    this.setData({
      showRefund:false,
      active_index:0
    })
  },
  //点击退款取消
  cancel(){
    this.setData({
      showRefund:false,
      active_index:0
    })
  },
});
