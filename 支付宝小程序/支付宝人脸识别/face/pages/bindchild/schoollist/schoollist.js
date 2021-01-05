// pages/parenthome/bindchild/schoollist/schoollist.js
// pages/teacherhome/studentselect/studentselect.js
const util = require('../../../../utils/util.js');
const http = require('../../../../utils/http.js');
const api = require('../../../../utils/api.js')


//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolid: '',
    mid: '',
    token: '',
    list: '',
  },


  /**
   * 点击学校
   */
  onItemClick: function (event) {
    var item = event.currentTarget.dataset.item;
    app.globalData.school = item;
    my.navigateBack({
      delta: 1,
    })
  },


  /**
   * 获取学生列表
   */
  getList: function () {
    // debugger
    const that = this;
    const data = {
      "mid": my.getStorageSync("logininfo").mid,
    }
    http.request(api.schoollistquery, data, my.getStorageSync("logininfo").token, ).then(function (result) {
      if (result.code == 0) {
        if (result.data) {
          that.setData({
            list: result.data,
          })
        }
        else{
          that.setData({
            list: [],
          })
        }

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    var logindata = my.getStorageSync("logininfo");
    var schoolidstr='';
    if (options.schoolid){
      schoolidstr = options.schoolid;
    }

    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
      schoolid: schoolidstr,
    })

   
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
    return {
      title: '分享',
      path: '/pages/index/index',

      success: function (res) {
        // 转发成功
        my.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }
  }
})