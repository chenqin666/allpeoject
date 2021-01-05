// pages/my/my.js
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')


//获取应用实例
const app = getApp()
var isFirst = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    logininfo:'',
    mid:'',
    headerurl:'',
    warningLevel:'',
    studentStatus:'',
  },

  

/**
   * 设置
   */
  go2setting: function(options) {
    my.navigateTo({
      url: 'setting/setting',
    })
  },

  // 拍照
  go2pai: function (options) {
    my.navigateTo({
      url: 'photo/photo',
    })

  },
  /**
   * 续费充值
   */
  go2recharge: function (options) {
    my.navigateTo({
      url: '../recharge/recharge',
    })
    // return;

    // if (this.data.logininfo.selected_member_type == 3) {
      
    //   if (!this.data.logininfo.last_login_student) {
    //     my.navigateTo({
    //       url: '../parenthome/bindchild/bindchild?pagetype=1',
    //     })
    //   } else{
    //     my.navigateTo({
    //       url: 'recharge/recharge',
    //     })
    //   }

    // }
   
  },


  /**
   * 切换身份
   */
  go2changeindify: function (options) {
    my.navigateTo({
      url: 'identityswitch/identityswitch',
    })
  },

  /**
   * 切换孩子
   */
  go2changechild: function (options) {
    my.navigateTo({
      url: 'childlist/childlist?from=list'
    })
  },

  /**
   * 个人资料
   */
  go2personinfo: function (options) {
    my.navigateTo({
      url: 'personalinfo/personalinfo',
    })
  },

  /**
   * 使用帮助
   */
  go2helpinfo: function (options) {
   
    // const targeturl = '../common/h5page/h5page?url=' + "https://m.fangao.100eks.com/helpparent.html" + "&title=" + "使用帮助";
    // console.log(targeturl)
    // my.navigateTo({
    //   url: targeturl
    // })
    // debugger
    my.navigateTo({
      url: './setting/about/about',
    })
    //  my.navigateTo({
    //   url: '../login/login',
    // })

  },
  go2about:function(){ 
    my.navigateTo({
      url: 'setting/aboutone/aboutone',
    })
  },
  // 退出登录
  loginout:function(){ 
    my.navigateTo({
      url: '../firstlogin/firstlogin',
    })
  },
  go2kefu: function () {
    my.setClipboardData({
      data: 'fangao_1',
      success: function (res) {
        util.toastTap("客服微信号复制成功");
      }
    })
    // this.setData({
    //   time: "点击复制微信号",
    //   mobile: "fangao_1",
    //   hidden: false,
    // });
    // my.navigateTo({
    //   url: 'setting/setting',
    // })
  },
 /**
   * 获取信息
   */

  getinfo:function(){
    var token = my.getStorageSync("token");
    var mid = my.getStorageSync("uid");
    const that = this;
    const data = {
      "mid": this.data.mid
    }
    this.setData({
      logininfo: my.getStorageSync("logininfo"),
      // warningLevel: app.globalData.warningLevel,
    });
    http.request(api.query, data, token, '', true).then(function (item) {
      if (item.code == 0) {
        app.globalData.validDate = item.data.validDate;
        // app.globalData.warningLevel = item.data.warningLevel;
        app.globalData.studentStatus = item.data.studentStatus;
        app.globalData.api_setting = item.data.api_setting;
        app.globalData.payNotice = item.data.payNotice;
        that.setData({
          logininfo: my.getStorageSync("logininfo"),
          // warningLevel: app.globalData.warningLevel,
          studentStatus: app.globalData.studentStatus,
        });
        return false;
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var loginData = my.getStorageSync("logininfo");
    this.setData({
      logininfo: loginData,
      mid: my.getStorageSync('uid'),
      token:my.getStorageSync('token'),
      headerurl: loginData.profile_url ? loginData.profile_url : "../../assets/icon_header_defaultmain.png",
    });

    // this.getinfo();
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
    if (!isFirst) {
      var loginData = my.getStorageSync("logininfo");
      console.log(loginData);
      this.setData({
        logininfo: loginData,
        mid: my.getStorageSync('uid'),
        token: my.getStorageSync('token'),
        headerurl: loginData.profile_url ? loginData.profile_url : "../../assets/icon_header_defaultmain.png",
      });
      // this.getinfo();
    }
    isFirst = false;
   
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
  },
})