// 获取全局 app 实例
// const util = require('../../utils/util.js');
// const http = require('../../utils/http.js');
// const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    user: '',
    originHeight: '',
    screenHeight: '',
    leaveStartShown:false,
    isOriginHeight: true,
    detailall: [],
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    this.getstora = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
   this.carditem = my.getStorageSync({
      key: 'carditem', // 缓存数据的key
    });
  // 获取记录详情
  this.getDetail();
  },
  
     // 获取记录详情
    getDetail: function () {
     my.showLoading({
      title: '加载中',
    })
       var that=this;
      const data = {
        "mid": that.carditem.data.mid,
      "card_sn": that.carditem.data.card_no,
      "stu_id": that.carditem.data.child_mid
      }
      
      my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/bill.query.lists', 
        data: {
          request: JSON.stringify(data)
        },
        headers: {
          "token":that.getstora.data.token,
          'appid':'2019090867080310'
        },
        dataType: "json",
        success: (res) => {
          my.hideLoading();
           if (res.data.code == 0) {
             if (res.data.data) {
                that.setData({
                  detailall: res.data.data,
                });
              }
              else {
                that.setData({
                  detailall: [],
                  leaveStartShown:true
                });
              }
            
            }
            else {
              my.showToast({
                  content: res.data.msg,
                });
          }
        },
        fail: (res) => {
          // 根据自己的业务场景来进行错误处理
         my.showToast({
            content: '网络错误,请重试！',
          });
          my.hideLoading();
        },
      });
    },
  // 监听生命周期回调 onShow
  onShow() {
   
  },
 

});
