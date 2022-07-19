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
require('../../components/menu-item/menu-item');
require('../../components/page-top/page-top');
require('../../components/shop-car/shop-car');
require('../../components/empty/empty');
require('../../components/message-box/message-box');
require('../../page/index/index');
require('../../page/user/index/index');
require('../../page/user/user_bill/user_bill');
require('../../page/user/user_order/user_order');
require('../../page/user/choose_menu/choose_menu');
require('../../page/store/index/index');
require('../../page/store/store_bill/store_bill');
require('../../page/store/up_menu/up_menu');
require('../../page/store/store_order/store_order');
require('../../page/store/menu_management/menu_management');
require('../../page/user/confirm_order/confirm_order');
require('../../page/user/paybal_results/paybal_results');
require('../../page/user/take_food_code/take_food_code');
require('../../page/store/create_menu/create_menu');
require('../../page/store/confirm_order/confirm_order');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}