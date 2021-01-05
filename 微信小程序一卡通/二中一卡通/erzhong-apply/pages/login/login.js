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
    isdis:false,
    mobile: '',
    name: '',
    password:'',
    action: 'mplogin',//默认为绑定使用mplogin，失效登录使用login
    msg: '获取验证码',
    flag: 0,
    auth_code: '',
    uid: '',
    company_id: '',
    school_icon:'',

  },
  // 卡号查询
  cardsearch() {
    wx.navigateTo({
      url: '../cardsearch/cardsearch',
    })
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
passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },


fgyun(){
  wx.navigateTo({
    url: '../hhh/hhh',
  })
},
go2recharge() {
  // 校易收
  wx.ap.navigateToAlipayPage({ 
     path:'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2016112803504802&scope=auth_base&redirect_uri=https://k12jiaofei.alipay-eco.com/callback/home?type=9&isvNo=5b0e25d750d39f02afd7f1e5&orderno=5d54f09a34d62610baac1336',
     success:(res) => {
         util.toastTap({content:'系统信息' + JSON.stringify(res)});
      },
      fail:(error) => {
         util.toastTap({content:'系统信息' + JSON.stringify(error)});        
      }
  })
},
/**
   * 登录
   */
  go2login: function () {
    const that = this;
    if (this.Trim(this.data.mobile)== '') {
     util.toastTap('请输入工号/学号');
      return false;
    }
    
    if (this.Trim(this.data.name) == '') {
     util.toastTap('请输入姓名');
      return false;
    } 
    // if (this.Trim(this.data.password) == '') {
    //  util.toastTap('请输入一卡通密码');
     
    //   return false;
    // } 
    that.setData({
      isdis: true
    });
    const data = {
      "mid": wx.getStorageSync("mid"),
      "stu_name": this.data.name,
      "card_num": this.data.mobile,
      "password": '000000'
      // this.data.password
      
    }
    http.request(api.logincards, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      // debugger
      if (result.code == 0) {
        util.toastTap(result.msg);
        wx.navigateTo({
          url: '../cards/cards',
        })
        that.setData({
          isdis:false
        });
      }
      else {
        util.toastTap(result.msg);
        that.setData({
          isdis: false
        });
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      school_icon: wx.getStorageSync("logininfo").school_icon ? wx.getStorageSync("logininfo").school_icon :'../../img/yuanxin.png'
    })
    console.log(this.data.school_icon)
    console.log(wx.getStorageSync("logininfo"))
    console.log(wx.getStorageSync("logininfo").school_icon)
     wx.hideShareMenu({

    });
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
      // school_icon:wx.getStorageSync("logininfo").school_icon
    })
    // console.log(this.data.school_icon)
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