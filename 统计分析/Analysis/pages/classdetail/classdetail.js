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
    school_id:'',
    grade_id:'',
    grade_name:"",
    gradeIndex:0,

    gradenames:[],
    keyword:'',


    list:'',
    page: 1,
    pageSize: 10

  
  },

  onItemClick:function(e){

      var item=e.currentTarget.dataset.item;

    var targetUrl = '../classstudentlist/classstudentlist?school_id=' + this.data.school_id + "&grade_id=" + this.data.grade_id + "&class_id=" + item.class_id + "&grade_name=" + this.data.grade_name + "&class_name=" + item.class_name ;
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

   
    var grade_listinfo = JSON.parse(options.grade_list);
    console.log(grade_listinfo);
    var  gradenamelist=[];
    for (var i=0; i < grade_listinfo.length;i++){
      gradenamelist.push(grade_listinfo[i].grade_name);
    
  }
   
    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
      school_id: options.school_id,
      grade_id: options.grade_id,
      grade_name: options.grade_name,
      grade_list: grade_listinfo,
      gradenames:gradenamelist
    })
   
    this.getList();
  },


  go2gradelist:function(e){
    console.log(e);
    this.setData({
      gradeIndex: e.detail.value,
      grade_name: this.data.grade_list[e.detail.value].grade_name,
      grade_id: this.data.grade_list[e.detail.value].grade_id,
    });
    this.getList();
  },

  getsearchcondition:function(e){
      this.setData({
        keyword:e.detail.value,
      });

  },

  /**
   * 搜索班级列表详情信息
   */
  getList: function () {

    const that = this;
   
    var   data = {
      "uid": this.data.mid,
      "school_id": this.data.school_id,
      "grade_id": this.data.grade_id,
      "keyword": this.data.keyword,

      "page": 1,
      "pageSize": this.data.pageSize
    }
    http.request(api.schoolanalysisdetail, data, this.data.token, ).then(function (result) {
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
    * 分页加载
    */
  getListmore: function () {
    if (canUseReachBottom == false) {
      return;
    }

    if (dataArray.length % this.data.pageSize > 0) { //不取数据了
      return;
    }

    const that = this;
    const data = {
      "uid": this.data.mid,
      "school_id": this.data.school_id,
      "grade_id": this.data.grade_id,
      "keyword": this.data.keyword,

      "page": parseInt(dataArray.length / this.data.pageSize) + 1,
      "pageSize": this.data.pageSize
    }

    canUseReachBottom = false;
    http.request(api.schoolanalysisdetail, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        if (!result.data) {
          dataArray = dataArray.concat([]);
        } else {
          dataArray = dataArray.concat(result.data);
        }

        that.setData({
          list: dataArray,
        });
      }
      canUseReachBottom = true;
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
    canUseReachBottom = true;
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