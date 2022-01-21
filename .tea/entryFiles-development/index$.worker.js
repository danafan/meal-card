if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../components/confirm-dialog/confirm-dialog');
require('../../components/date-picker/date-picker');
require('../../components/bill-item/bill-item');
require('../../page/index/index');
require('../../page/user/index/index');
require('../../page/user/user_bill/user_bill');
require('../../page/store/index/index');
require('../../page/store/store_bill/store_bill');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}