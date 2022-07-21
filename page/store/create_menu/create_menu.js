const resource = require('../../../utils/api.js').API;
let app = getApp();
Page({
  data: {
    type: '1',            //1:新增；2:编辑
    id: "",                //编辑的ID
    img_url: "",          //上传的图片地址
    name:"",              //上传的图片后缀
    domain: "",           //前缀
    menu_name: "",        //菜品名称
    menu_price: "",      //菜品价格
    show_message: false, //保存弹窗
    message_text: "",    //弹窗内容
  },
  onLoad(e) {
    if (e.id) { //编辑
      this.setData({
        id: e.id
      })
      //获取菜品详情
      this.menuDetail();
    }
    this.setData({
      type: e.id ? '2' : '1',
    })
    dd.setNavigationBar({
      title: e.id ? '编辑菜品' : '新增菜品',
    });
  },
  //获取菜品详情
  menuDetail() {
    let arg = {
      id: this.data.id
    }
    resource.menuDetail(arg).then(res => {
      this.setData({
        name: res.data.image,          //上传的图片地址
        img_url: res.data.domain + res.data.image,
        menu_name: res.data.dishes_name,
        menu_price: res.data.dishes_price
      })
    });
  },
  //点击选择图片
  chooseImg() {
    dd.chooseImage({
      success: (res) => {
        //上传图片
        this.uploadImg(res.apFilePaths[0]);
      },
    });
  },
  //上传图片
  uploadImg(file_path) {
    let uploadUrl = getApp().globalData.uploadUrl;
    dd.uploadFile({
      url: uploadUrl + 'common/addimage',
      fileType: 'image',
      fileName: 'file',
      filePath: file_path,
      success: (res) => {
        let data = JSON.parse(res.data);
        if (data.code == '1') {
          this.setData({
            name: data.data.name,          //上传的图片地址
            domain: data.data.domain,
            img_url:data.data.domain + data.data.name
          })
        } else {
          dd.showToast({
            type: 'none',
            content: data.msg,
            duration: 2000
          });
        }
      },
      fail: (err) => {
        console.log(err)
      }
    });
  },
  //监听菜品名称和菜品价格
  onInput(v) {
    let key = v.target.dataset.type;
    let value = v.detail.value;
    this.setData({
      [key]: value
    })
  },
  //保存
  save() {
    if (this.data.img_url == '') {
      dd.showToast({
        type: 'none',
        content: '请上传菜品主图!',
        duration: 2000
      });
    } else if (this.data.menu_name == '') {
      dd.showToast({
        type: 'none',
        content: '请输入菜品名称!',
        duration: 2000
      });
    } else if (this.data.menu_price == '') {
      dd.showToast({
        type: 'none',
        content: '请输入菜品价格!',
        duration: 2000
      });
    } else {
      //保存提交
      this.setData({
        message_text: '确定要保存菜品吗？',
        show_message: true
      })
    }
  },
  //弹窗按钮
  onTapFn(type) { //0:否；1:是
    if (type == '1') {
      //提交
      this.confirmFn();
    } else {
      this.setData({
        show_message: false
      })
    }
  },
  //提交
  confirmFn() {
    var arg = {
      image: this.data.name,
      name: this.data.menu_name,
      price: this.data.menu_price
    }
    if (this.data.type == '1') {  //创建
      resource.createMenu(arg).then(res => {
        dd.redirectTo({
          url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=菜品新增成功&show_back=1'
        })
      });
    } else {  //编辑  
      arg.id = this.data.id;
      resource.editMenu(arg).then(res => {
        dd.redirectTo({
          url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=菜品编辑成功&show_back=1'
        })
      });
    }

  }
});
