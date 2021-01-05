// pages/classdetail/classdetail.js

const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

const app = getApp()


var canUseReachBottom = true;//触底函数控制变量
var dataArray = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school_id: '',
    grade_id: '',
    newtype:'',


    list: '',
    page: 1,
    pageSize: 10


  },

  onItemClick: function (e) {

    var item = e.currentTarget.dataset.item;

    var targetUrl = '../todaystudentinfo/todaystudentinfo?school_id=' + this.data.school_id + "&grade_id=" + item.grade_id + "&class_id=" + item.class_id + "&grade_name=" + item.grade_name + "&class_name=" + item.class_name + "&newtype=" + this.data.newtype;

    
    console.log(targetUrl);
    wx.navigateTo({
      url: targetUrl,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    canUseReachBottom = true;
    var muid = wx.getStorageSync("uid");
    var mtoken = wx.getStorageSync("token");
    var logindata = wx.getStorageSync("logininfo");



    

    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
      school_id: options.school_id,
      grade_id: options.grade_id,
      newtype: options.newtype,
    })
    // class_bind   绑定     class_recharge   缴费    class_bind_recharge   绑定 + 缴费
    if (this.data.newtype =="class_recharge"){
      wx.setNavigationBarTitle({
        title: '今日充值概况',
      })
    } else if (this.data.newtype == "class_bind") {
      wx.setNavigationBarTitle({
        title: '今日绑定概况',
      })
    } else if (this.data.newtype == "class_bind_recharge") {
      wx.setNavigationBarTitle({
        title: '今日绑定并充值概况',
      })
    } 

    this.getList();
  },


  /**
   * 搜索班级列表详情信息
   */
  getList: function () {

    const that = this;

    var data = {
      "uid": this.data.mid,
      "school_id": this.data.school_id,
      "grade_id": this.data.grade_id,
      "type":this.data.newtype,
    }
    http.request(api.schoolexecutetwo, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {

        if (!result.data) {
          dataArray = [];
        } else {
          dataArray = result.data;
        }
        that.setData({
          list: dataArray,
        });

      }
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

  }
})