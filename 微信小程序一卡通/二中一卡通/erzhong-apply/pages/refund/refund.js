// pages/my/recharge/recharge.js

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
    list: [],
    token: '',
    mid: '',
    checkedid: '',
    isvalid: 0,
    logininfo: '',
    validdate: '',
    studentStatus: '',
    payNotice:'',
    listlength: '',
    showlistlength:true,
    allcheck:{},
    allcheckone: {},
    showone:true,
    showtwo:false,
    totips:false,
    newmode:'',//第几种方式提交
    zhifubao:'',//支付宝账号
    shiming:'',//实名
    datalist:'',
    searchValue:'请输入以上支付宝账号实名认证的真实姓名',
    searchValueone:'请输入支付宝账号，手机号/邮箱',
  },
  focusFnone: function (e) {
    this.setData({
      searchValueone: ""
    })
  },
  blurFnone: function (e) {
    this.setData({
      searchValueone: "请输入支付宝账号，手机号/邮箱"
    })
  },
  focusFn: function (e) {
    this.setData({
      searchValue: ""
    })
  },
  blurFn: function (e) {
    this.setData({
      searchValue: "请输入以上支付宝账号实名认证的真实姓名"
    })
  },
  // 支付宝账号
  zhifubaoinput: function (e) {
    this.setData({
      zhifubao: e.detail.value
    })
  },
  // 实名
  shiminginput: function (e) {
    this.setData({
      shiming: e.detail.value
    })
  },
  /**
   *  点击item
   */
  onTypeClickone: function (event) {
    this.setData({
      showone: true,
      showtwo:false
    });
  },
  onTypeClicktwo: function(event) {
    this.setData({
      showone: false,
      showtwo: true
    });
  },
  // 第一种方式提交
  subone:function(){
    this.setData({
      totips: true,
      newmode: 'one',
    });
  },
  // 第二种方式提交
  subtwo: function () {
    if (!this.data.zhifubao) {
      util.toastTap('请输入支付宝账号');
      return false;
    }
    if (!this.data.shiming) {
      util.toastTap('请输入以上支付宝账号实名认证的真实姓名');
      return false;
    }
    this.setData({
      totips: true,
      newmode:'two',
    });
  },
  // 取消
  cancel() {
    this.setData({
      totips: false
    });
  },
  // 确定弹框
  confirmpsd() {
    // 第一种方式提交
    // debugger
    if (this.data.newmode=='one'){
      this.firstmode()
    }
    // 第er种方式提交
    if (this.data.newmode == 'two') {
      
      this.secondmode()
    }
  },
  // 第一种方式提交
  firstmode:function(){
    var that = this;
    const data = {
      // "mid": wx.getStorageSync("mid")
      "stu_id": wx.getStorageSync("carddetail").stu_id, 
      "refund_id": wx.getStorageSync("carddetail").refund_info.refund_id, 
      "refund_type": 1, 
      "alipay_account": "", 
      "realname": ""
    }
    http.request(api.refundsub, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        wx.navigateTo({
          url: '../mainsucess/mainsucess'
        })
        util.toastTap(result.msg);
        that.setData({
          totips: false
        });
        // debugger
      }
      else {
        util.toastTap(result.msg);
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
  // 第er种方式提交
  secondmode:function(){
    var that = this;
    if (!that.data.zhifubao){
          util.toastTap('请输入支付宝账号');
					return false;
    }
    if(!that.data.shiming){
      util.toastTap('请输入以上支付宝账号实名认证的真实姓名');
        return false;
    }
    const data = {
      // "mid": wx.getStorageSync("mid")
      "stu_id": wx.getStorageSync("carddetail").stu_id,
      "refund_id": wx.getStorageSync("carddetail").refund_info.refund_id,
      "refund_type": 2,
      "alipay_account": that.data.zhifubao,
      "realname": that.data.shiming
    }
    http.request(api.refundsub, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        wx.navigateTo({
          url: '../mainsucess/mainsucess'
        })
        util.toastTap(result.msg);
        that.setData({
          totips: false
        });
        // debugger
      }
      else {
        util.toastTap(result.msg);
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 获取支付信息
   */
  go2recharge: function(event) {
    const that = this;
    const data = {
      "mid": this.data.mid,
      "product_id": this.data.checkedid,
    }

    http.request(api.rechargeexecutesubmit, data, this.data.token, ).then(function(result) {
      if (result.code == 0) {
        that.goWxPay(result.data);
      }
    })

  },


  carddetails() {
    var that = this;
    const data = {
      // "mid": wx.getStorageSync("mid"),
      // "stu_name": wx.getStorageSync("stu_name"),
      // "card_num": wx.getStorageSync("snumber"),
      "refund_id": wx.getStorageSync("carddetail").refund_info.refund_id,
      "stu_id": wx.getStorageSync("carddetail").stu_id
    }
    http.request(api.orders, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        // util.toastTap(result.msg);
        that.setData({
          datalist: result.data,
         
        });
      }
      else {
        util.toastTap(result.msg);
      }
     
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu({

    });
    var logindata = wx.getStorageSync("logininfo");
    this.setData({
      logininfo: logindata,
      mid: wx.getStorageSync("uid"),
      token: wx.getStorageSync("token"),
     
    });

    this.carddetails();

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
        wx.showToast({
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