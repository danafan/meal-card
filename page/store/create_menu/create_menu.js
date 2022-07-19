Page({
  data: {
    img_url: "",       //上传的图片地址
    menu_name: "",   //菜品名称
    menu_price: "",    //菜品价格
  },
  onLoad(e) {
    if (e.id) { //编辑
      console.log('编辑')
    } else {    //新增
      console.log('新增')
    }
    dd.setNavigationBar({
      title: e.id ? '编辑菜品' : '新增菜品',
    });
  },
  //点击选择图片
  chooseImg() {
    dd.chooseImage({
      success: (res) => {
        this.setData({
          img_url: res.apFilePaths[0]
        })
      },
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
    //保存提交
    this.confirmSave();
    if (this.data.menu_name == '') {
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
      if (this.data.img_url != '') {
        // dd.uploadFile({
        //   url: getApp().globalData.baseurl + 'supplier/upload_evidence',
        //   fileType: 'image',
        //   fileName: 'evidence',
        //   filePath: this.data.img_url,
        //   success: (res) => {
        //     let data = JSON.parse(res.data);
        //     if (data.code == '1') {
        //       //保存提交
        //       let arg = {
        //         img_url:this.data.img_url,
        //         menu_name: "",   //菜品名称
        //         menu_price: "",    //菜品价格
        //       }
        //       this.confirmSave(arg);
        //     } else {
        //       dd.showToast({
        //         type: 'none',
        //         content: data.msg,
        //         duration: 2000
        //       });
        //     }
        //   }
        // });
      } else {
        // //保存提交
        // let arg = {
        //   menu_name: "",   //菜品名称
        //   menu_price: "",    //菜品价格
        // }
        // this.confirmSave(arg);
      }
    }
  },
  //保存提交
  confirmSave() {
    dd.confirm({
      title: '温馨提示',
      content: '确定要保存菜品吗?',
      confirmButtonText: '是',
      cancelButtonText: '否',
      success: (result) => {
        if (result.confirm) {
          this.setData({
            img_url: "",       //上传的图片地址
            menu_name: "",   //菜品名称
            menu_price: "",    //菜品价格
          })
          dd.navigateTo({
            url: '/page/user/paybal_results/paybal_results?result_type=1&toast_text=保存成功&show_back=1'
          })
        };
      },
    });
  }
});
