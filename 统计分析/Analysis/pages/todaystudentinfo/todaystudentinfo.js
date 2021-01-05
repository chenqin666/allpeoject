// pages/classstudentlist/classstudentlist.js

const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

const app = getApp()
var dataArray = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {


    school_id: '',
    grade_id: '',
    grade_name: "",
    class_id: '',
    class_name: '',
    newtype:'',

    list: '',
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var muid = wx.getStorageSync("uid");
    var mtoken = wx.getStorageSync("token");
    var logindata = wx.getStorageSync("logininfo");



    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
      school_id: options.school_id,
      grade_id: options.grade_id,
      grade_name: options.grade_name,
      class_id: options.class_id,
      class_name: options.class_name,
      newtype: options.newtype
    })

    wx.setNavigationBarTitle({
      title: this.data.grade_name + this.data.class_name+"今日概况",
    })
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
      "class_id": this.data.class_id,
      "type": this.data.newtype
    }
    console.log(this.data.token);
    http.request(api.schoolexecutethree, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        console.log(result);
        if (!result.data) {
          that.setData({
            list: [],
          });

        } else {

          that.setData({
            list: result.data,
          });

        }


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