// pages/dateselect/dateselect.js

const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 请假开始时间
    leaveStartTime: "",
    leaveStartShown: false,

    // 请假截止时间
    leaveEndTime: "",
    leaveEndShown: false,


    // 请假时间范围
    // leavestartTime1: util.formatstartDate(new Date()),
    // leaveendTime1: util.formatstartDate(new Date()),

    leavestartTime1:"2017-01-01" ,
    leaveendTime1: "2100-01-01",

    // starttime: util.formatTime(new Date()).substring(11, 16),
    // endtime: util.formatTime(new Date()).substring(11, 16),

  },


  go2startTime:function(e){
    console.log(e);

    this.setData({
      leaveStartTime:e.detail.value,
      leaveStartShown:true
    });

  },

  go2endTime: function (e) {

    this.setData({
      leaveEndTime: e.detail.value,
      leaveEndShown: true
    });

  },

  /**
   * 确认时间
   */
  onconfirm:function(e){
    if (!this.data.leaveStartTime){
      util.toastTap("请选择开始时间");
      return;
    }
  
    if (!this.data.leaveEndTime) {
      util.toastTap("请选择结束时间");
      return;
    }

    app.globalData.starttime = this.data.leaveStartTime;
    app.globalData.endtime = this.data.leaveEndTime;
    app.globalData.isselectTime=true;

    wx.navigateBack({
    
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