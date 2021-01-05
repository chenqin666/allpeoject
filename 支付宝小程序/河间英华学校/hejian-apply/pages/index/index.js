// pages/login/login.js
const util = require('../../utils/util.js');

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
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isrequesting: false,
    user_id:'',
   
  },
 
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
// 根据code获取access_token
 sbutoken:function(){
  var that=this
  var request = {"code": that.authCodes};
   my.showLoading({
      title: '加载中',
    })
  // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
    my.httpRequest({
      method: 'POST',
      url: 'https://api.fangaoykt.100eks.cn/zhifubao.get.access.token', 
      data: {
        request: JSON.stringify(request)
      },
      headers: {
        'appid':'2021001193630999'
      },
      dataType: "json",
      success: (res) => {
          if (res.data.code == 0) {
             my.hideLoading();
            that.carlist = res.data.data;
            that.setData({
                user_id: that.carlist.user_id,
                access_token: that.carlist.access_token,
                login_data:that.carlist.login_data
            })
            // 储存登录数据
            my.setStorageSync({
              key: 'logins',
              data: {
                user_id: that.carlist.user_id,
                access_token: that.carlist.access_token,
                
              }
            });
             if(that.carlist.login_data){
               // 储存登录数据
                my.setStorageSync({
                  key: 'loginsone',
                  data: {
                    mid: that.carlist.login_data.mid,
                    token: that.carlist.login_data.token,
                  }
                });
               that.setData({
                    hasUserInfo: false,
                })
                my.redirectTo({
                  url: '../cards/cards',
                })
               
            }
            else{
               that.setData({
                    hasUserInfo: true,
                })
            }
            
        }
          else {
            my.showToast({
              type: 'error',
              content: res.msg,
              duration: 1500
            });
        }
      },
      fail: (res) => {
         my.hideLoading();
          my.showToast({
              type: 'error',
              content: '网络错误,请重试！',
              duration: 1500
            });
      },
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
          'appid':'2021001193630999'
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

 onGetAuthorize(res) {
   var that=this
     my.getOpenUserInfo({
      fail: (res) => {
      },
      success: (res) => {
        let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
         that.setData({
            userInfo: JSON.parse(res.response).response,
            
        })
        that.execute()
      }
    });
    
    },
  // 获取用户信息
  authers(){
    // 获取code
     var that=this
     my.getAuthCode({
      scopes: ['auth_base'],
      success: (res) => {
        if (res.authCode) {
             // 储存登录数据
            my.setStorageSync({
              key: 'logins',
              data: {
                codes: res.authCode,
              }
            });
            that.authCodes=res.authCode
            that.sbutoken()
          }
      },
    });
  },
  // 状态
  isopen(){
    const that = this;
    const request = {};
   
    my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/server.status.query', 
        data: {
          request: JSON.stringify(request)
        },
          headers: {
          'appid':'2021001193630999'
        },
        dataType: "json",
        success: (res) => {
           if (res.data.code == 0) {
              if (res.data.data.server_status=='ON'){
                that.authers();
                // that.setData({
                //   isconfirm: true
                // })
              }
              else{
                that.setData({
                  isconfirm: true
                })
              }

       }
           
        },
        fail: (res) => {
         
        },
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
   this.isopen()
    
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