// pages/login/rolepicker/rolepicker.js
const util = require('../../../utils/util.js');
const http = require('../../../utils/http.js');
const api = require('../../../utils/api.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //授权状态信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: my.canIUse('button.open-type.getUserInfo'),


    
  },

  /**
   * 家长首页
   */
  go2parenthome: function(options) {
    my.setStorageSync("member_type","parent");
    my.navigateTo({
      url: "../login"　　 // 带参数进入登录页面
    })
  },

  /**
   * 教师首页
   */
  go2teacherhome: function(options) {
    my.setStorageSync("member_type", "teacher");
    my.navigateTo({
      url: "../login"　　 // 带参数进入登录页面
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onLoad");
    // my.hideShareMenu({

    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '专业app开发定制服务商-北京新道浩达',
      path: 'pages/login/rolepicker/rolepicker',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})