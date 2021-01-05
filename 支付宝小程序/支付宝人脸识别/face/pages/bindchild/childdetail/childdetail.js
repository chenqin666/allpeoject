// pages/parenthome/bindchild/childdetail/childdetail.js

const util = require('../../../utils/util.js');
const http = require('../../../utils/http.js');
const api = require('../../../utils/api.js')

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    child: '',
    mid: '',
    token: '',
    tag: '',
    relation:"",
    headerurl: '',


    mobile: '',
    code: '',
    action: 'verify',//默认为绑定使用mplogin，失效登录使用login
    msg: '获取验证码',
    flag: 0,
    auth_code: '',
    uid: '',
    company_id: ''

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
    http.request(api.verifycode, data, this.data.token).then(function (item) {
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
     * 验证短信验证码
     */
  go2login: function () {
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

    const data = { "mobile": this.data.mobile, "action": this.data.action, "verify_code": that.data.code };

    my.showLoading({
      title: '加载中',
    })
    http.request(api.verification, data, this.data.token, '', true).then(function (item) {
      if (item.code == 0) {
        that.confirm();
        // 验证成功后隐藏验证按钮  展示立即绑定按钮
        // that.setData({
        //   tag: options.page,

        // })
        return false;
      }
      else{
        util.toastTap(item.msg)
      }
    })
  },

  /**
   * 点击确定提交数据
   */
  confirm: function() {
    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": this.data.child.child_mid,
      "relation": this.data.relation,
    }
   
   
    // if (app.globalData.child.bind_status == "unbind") {
      // api.memberbindchild
      
      http.request(api.bindChild, data, this.data.token, ).then(function(item) {
        if (item.code == 0) {
          my.setStorageSync('logininfo', item.data)
          my.setStorageSync('uid', item.data.mid)
          my.setStorageSync('token', item.data.token)
          app.globalData.childlistfresh = true;
          if (that.data.tag) {
            my.navigateBack({
              delta: 2
            })
          } 
          else {
            my.reLaunch({
              url: '../../parenthome',
            })
          }
        }
        else {
          util.toastTap(item.msg)
        }
      })

    // } 
    // else {
    //   var targeturl ="../bindchildcheck/bindchildcheck";
    //   if (this.data.tag){
    //     targeturl = "../bindchildcheck/bindchildcheck?page=" + this.data.tag+ "&relation=" + that.data.relation;
    //   }else{
    //     targeturl = "../bindchildcheck/bindchildcheck" + "?relation=" + that.data.relation;
    //   }

    
    //   my.navigateTo({
    //     url: targeturl,
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // my.hideShareMenu({

    // });
    // if (options.page) {
    //   this.setData({
    //     tag: options.page,
      
    //   })
    // }
    // this.setData({
    //   relation: options.relation,
    // })
   
    // var muid = my.getStorageSync("uid");
    // var mtoken = my.getStorageSync("token");
    // this.setData({
    //   mid: muid,
    //   token: mtoken,
    //   child: app.globalData.child,

    // })
    // headerurl: app.globalData.child.profile_url,
    // app.globalData.child = null;
    // console.log(this.data.child.profile_url);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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