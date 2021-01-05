// pages/my/recharge/recharge.js
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
    showlistlength: true,
    allcheck: {},
    allcheckone: {},
  },

  

 /**
     * 一卡通充值服务协议
     */
  handlepricechange: function() {
    const targeturl = '../../common/h5page/h5page?url=' + "https://m.fangao.100eks.com/priceadjustment.html" + "&title=" + "价格调整说明";
    console.log(targeturl)
    my.navigateTo({
      url: targeturl
    })
  },

  /**
     * 一卡通充值服务协议
     */
  xieyi: function () {
    const targeturl = '../../common/h5page/h5page?url=' + "https://m.fangao.100eks.com/payagreement.html" + "&title=" + "用户续费充值协议";
    console.log(targeturl)
    my.navigateTo({
      url: targeturl
    })
  },


  /**
   *  点击item
   */
  onTypeClick: function(event) {
    
    var id = event.currentTarget.dataset.id;
    this.setData({
      checkedid: id,

    });
    
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

  /**
   * 调起微信
   */
  goWxPay: function(event) {
    my.requestPayment({
      'timeStamp': String(event.timestamp),
      'nonceStr': event.nonce_str,
      'package': 'prepay_id=' + event.prepay_id,
      'signType': 'MD5',
      'paySign': event.sign_new,

      'success': function(res) {
        util.toastTap("支付成功");
        app.globalData.refreshValidDate = true;
        app.globalData.warningLevel=0;
        setTimeout(function() {
          my.navigateBack({
            
          })
        }, 1500) //延迟

      },
      'fail': function(res) {
        if ("fail cancel" == res.requestPayment) {
          // util.toastTap("用户取消支付");
        } else {
          // util.toastTap(res.requestPayment);
        }
      },
      'complete': function(res) {

      }
    })
  },




  /**
    *  获取充值产品
    */
  getProduct: function () {
    
    const that = this;
    const data = {
      "mid": this.data.mid,
    }
    var DATE = util.formatTime(new Date());
    http.request(api.rechargeproductlistquery, data, this.data.token).then(function (result) {
      if (result.code == 0) {
        that.setData({
          list: result.data,
          checkedid: result.data[0] ? result.data[0].product_id : '',
          allcheck: result.data[0] ? result.data[0] : '',
          allcheckone: result.data[1] ? result.data[1] : '',
          listlength: result.data.length,
          showlistlength: result.data.length == 2 ? true : false
          // date: DATE,
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    var logindata = my.getStorageSync("logininfo");
    console.log(app.globalData.warningLevel);
    this.setData({
      logininfo: logindata,
      mid: my.getStorageSync("uid"),
      token: my.getStorageSync("token"),
      isvalid: app.globalData.warningLevel,
      // validdate: util.stringToYMD(app.globalData.validDate)
      validdate:app.globalData.validDate.substr(0, 10),
      studentStatus: app.globalData.studentStatus,
      payNotice: app.globalData.payNotice?app.globalData.payNotice:'',
    });

    this.getProduct();

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