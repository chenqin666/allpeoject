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
    mobile: '',
    code: '',
    action: 'mplogin',//默认为绑定使用mplogin，失效登录使用login
    msg: '获取验证码',
    flag: 0,
    auth_code: '',
    uid: '',
    company_id: ''

  },

 // 协议
  tohelp: function () {
   my.navigateTo({
      url: '../helps/helps',
    })
  },
  mobileinput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeinput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },


  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

   /**
   * 获取验证码
   */
  getcode: function () {
    const that = this;
    if (this.data.flag) {
      return false;
    }
    if (this.Trim(this.data.mobile) == '') {
      util.toastTap('请输入手机号');
      return false;
    }
    var pattern = /^[1][0-9]{10}$/;
    if (!pattern.test(this.Trim(this.data.mobile))) {
      util.toastTap('手机号格式错误');
      return false;
    }
    const data = { "mobile": this.data.mobile, "action": this.data.action };
    http.request(api.verifycode, data, ).then(function (item) {
      console.log(item)
      if (item.code == 0) {
        util.toastTap('验证码发送成功！'),
        that.times();
      }
    })

  },

  /**
   * 发送验证码倒计时
   */
  times: function () {
    const that = this;
    var countdown = 60;
    var inter = setInterval(function () {
      if (countdown == 0) {
        clearInterval(inter)
        that.setData({
          flag: 0,
          msg: '获取验证码'
        })
        countdown = 60;
        return;
      } else {
        that.setData({
          flag: 1,
          msg: countdown + 's'
        })
        countdown--;
      }

    }, 1000)
  },

/**
   * 去登录
   */
  go2login: function () {
   
      my.switchTab({
        url: '../cards/cards',
      })
    const that = this;
    if (this.Trim(this.data.mobile) == '') {
      util.toastTap('请输入手机号');
      return false;
    }
    var pattern = /^[1][0-9]{10}$/;
    if (!pattern.test(this.Trim(this.data.mobile))) {
      util.toastTap('手机号格式错误');
      return false;
    }
    if (this.Trim(this.data.code) == '') {
      util.toastTap('验证码不能为空');
      return false;
    } 

    const data = { "mobile": this.data.mobile, "action": this.data.action, "verify_code": that.data.code};

    my.showLoading({
      title: '加载中',
    })
    http.request(api.verification, data, '', '',true).then(function (item) {
      if (item.code == 0) {
        that.login();
        return false;
      }
    })
  },


  /**
   * 登录
   */
  login:function(){
    const that = this;
    var openid=  my.getStorageSync("openid");
    var unionid = my.getStorageSync("unionid");
    var member_type = my.getStorageSync("member_type");

    const dataxx = { "openid": openid, "unionid": unionid, "mobile": this.data.mobile, "member_type": member_type }


    var requesturl = api.bind;
    if(this.data.action=="login"){
      requesturl = api.login;
    }

    http.request(requesturl, dataxx, '', '',true).then(function (item) {
      if (item.code == 0) {
        my.setStorageSync('logininfo', item.data)
        my.setStorageSync('uid', item.data.mid)
        my.setStorageSync('token', item.data.token)
        console.log(item.data.token)
        that.setData({
          uid: item.data.uid
        })

        if (item.data.selected_member_type == 2) {//表示老师
          my.switchTab({
            url: '../parenthome/parenthome',
          })
        } else if (item.data.selected_member_type == 3) {//表示家长

          if (item.data.last_login_student == null) {//没有绑定孩子，跳转到绑定孩子页面
            my.navigateTo({
              url: '../parenthome/bindchild/bindchild',
            })
          } else {
            my.switchTab({
              url: '../parenthome/parenthome',
            })
          }
        }
        return false;
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tokenlost);
    // my.hideShareMenu({

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
   * 使用帮助说明
   */
  onHelpClick:function(event){
    const targeturl = '../common/h5page/h5page?url=' + "https://m.fangao.100eks.com/helpparent.html" + "&title=" + "使用帮助";
    console.log(targeturl)
    my.navigateTo({
      url: targeturl
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