// pages/login/login.js

const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

const app = getApp()
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    mobile: '',
    name: '',
    password:'',
    authCodes:'',
    login_data:'',
    user: '',
    isalipay: '',
   redirect_uri: '',
   carlist: {},
    motto: 'Hello World',
    isconfirm: false,
    ishidden: true,
    userInfo: {},
    hasUserInfo: false,
    // canIUse: my.canIUse('button.open-type.getUserInfo'),
    isrequesting: false,
    user_id:'',
   
  },
  // 关闭
closes:function(){
 my.showToast({
                type: 'error',
                content: '需要先关闭支付功能后，才能关闭人脸识别功能',
                duration: 1500
              });
},
//  登录
  execute:function(){
   var that=this
 
   var request = {
      "user_id":that.data.user_id,
      "avatar":that.data.userInfo.avatar,
      "nick_name":that.data.userInfo.nickName, 
      "gender":that.data.userInfo.gender
    };
   
    // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
      my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/zhifubao.execute.auth', 
        data: {
          request: JSON.stringify(request)
        },
          headers: {
          '2021002116636196':'2019090867080310'
        },
        dataType: "json",
        success: (res) => {
          
           if (res.data.code == 0) {
              that.carlist = res.data.data;
              // 储存登录数据
              my.setStorageSync({
                key: 'loginsone',
                data: {
                  mid: that.carlist.mid,
                  token: that.carlist.token,
                }
              });
              
              my.redirectTo({
                url: '../cards/cards',
              })
          }
            else {
              my.showToast({
                type: 'error',
                content: res.data.msg,
                duration: 1500
              });
          }
        },
        fail: (res) => {
         
            my.showToast({
                type: 'error',
                content: '网络错误,请重试！',
                duration: 1500
              });
        },
      });
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})