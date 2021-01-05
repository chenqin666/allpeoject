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
    showschool:false,//展示校区
    showpsd:true,//展示账号密码
    mobile: '',
    auth_code: '',
    name: '',
    company_id: '',
    school_icon:'',
    popupVisible: false,
    detailall: [],
    dataArr:['美国', '中国', '巴西', '日本'],
   
    pickerVal: '',//获取月份
    schoolinfoone: '',
    schoolinfotwo: '',
    monthyfirst: ''

  },

  mobileinput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeinput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

/**
   * 登录
   */
  go2login: function () {
    const that = this;
   
    if (this.data.mobile== '') {
     util.toastTap('请输入账号');
      return false;
    }
    
    if (this.data.name == '') {
     util.toastTap('请输入密码');
      return false;
    } 
    wx.setStorageSync('number', this.data.mobile)
    wx.setStorageSync('passward', this.data.name)
    const data = {
      password: this.data.name,
      account: this.data.mobile,
      
    }
      wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500000
    })
    // wx.getStorageSync("token"),
    http.request(api.logins, data,'', '', true).then(function (result) {
      if (result.errCode == 0) {
        // debugger
        wx.hideLoading();
        // util.toastTap(result.errMsg);
        console.log(result)
        wx.setStorageSync('token', result.meta.token)
        wx.setStorageSync('schoolinfoone', result.data)
        wx.setStorageSync('schoolinfotwo', result.meta)
        that.setData({
          schoolinfoone: result.data,
          schoolinfotwo: result.meta
        });
        if (result.data.schoolName){
          that.setData({
            showschool: true,
            showpsd: false,
          });
        }
        // wx.navigateTo({
        //   url: '../recognition/recognition',
        // })
      }
      else if (result.errCode != 0 && result.errCode != 2002) {//2002登录失效
        wx.hideLoading();
        util.toastTap(result.errMsg);
      }
      else {
        wx.hideLoading();
        util.toastTap(result.errMsg);
       
      }
    })

  },
  // 人脸认证
  facerecognition: function () {
    
    wx.navigateTo({
      url: '../recognition/recognition',
    })
    
  },


  //激活picker组件
  showmonth(e, value) {
    this.popupVisible = true;
  },
  bindObjPickerChange(e) {
    const that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    that.setData({
      arrIndex: e.detail.value
    });
    // debugger
    for (var i = 0; i < that.data.dataArr.length; i++) {
      if (i == e.detail.value) {
        that.setData({
          monthyfirst: that.data.dataArr[i]
        })
      }
    }
    console.log(that.data.monthyfirst)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //  wx.hideShareMenu({

    // });
    if (options.tokenlost){
      setTimeout(function () {
        util.toastTap("账号登录失效，请重新登录");
      }, 1800) //延迟
    }
    if (!options.action){
      return;
    }

    this.setData({
      action: options.action,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showschool: false,//展示校区
      showpsd: true,//展示账号密码
      mobile: wx.getStorageSync('number') ? wx.getStorageSync('number'):'',
      name: wx.getStorageSync('passward') ? wx.getStorageSync('passward'):'',
    })
   
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