if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/add-button/add-button?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/login/login?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/firstlogin/firstlogin?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mainsucess/mainsucess?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/cards/cards?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/face/face?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pay/pay?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/bindchild/bindchild?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/bindchild/childdetail/childdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/helps/helps?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/searchall/searchall?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/hhh/hhh?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/recharge/recharge?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/dingdetail/dingdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/details/details?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/losscard/losscard?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/changepsd/changepsd?hash=82bba35dca94fb4061b5fc19aaebd266c53b14d6');
require('../../pages/cardsearch/cardsearch?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/my?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/photo/photo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/setting/setting?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/setting/about/about?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/setting/aboutone/aboutone?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/childlist/childlist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/identityswitch/identityswitch?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/personalinfo/personalinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/personalinfo/changemobile/changemobile?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/recharge/recharge?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/my/childdetail/childdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}