// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    user: '',
    originHeight: '',
    screenHeight: '',
    isOriginHeight: true,
    leaveStartShown: false,
    detailall: '',
  },
  // 监听生命周期回调 onLoad
  onLoad() {
  // 获取记录详情
  this.getDetail();
  },
  
     // 获取记录详情
    getDetail: function () {
      wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
       var that=this;
      const data = {
        "mid": wx.getStorageSync("mid"),
        "card_sn": wx.getStorageSync("snumber"),
        "stu_id": wx.getStorageSync("childid"), 
      }
      var appid = 'wx49526e1bcd13c472';
      http.request(api.monthlists, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
        if (result.code == 0) {
          if (result.data){
            that.setData({
              detailall: result.data,
            });
          }
         else{
            that.setData({
              detailall: [],
              leaveStartShown: true
            });
         }
        }
        else {
         
          util.toastTap(result.msg);
        }
        wx.hideLoading()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
    },
  // 监听生命周期回调 onShow
  onShow() {
   
  },
  

});
