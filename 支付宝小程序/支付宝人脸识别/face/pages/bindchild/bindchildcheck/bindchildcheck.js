// pages/parenthome/bindchild/bindchildcheck/bindchildcheck.js
const util = require('../../../../utils/util.js');
const http = require('../../../../utils/http.js');
const api = require('../../../../utils/api.js')

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:'',
    token:'',
    bind_by:'',
    bind_code:'',
    tag:'',
    relation:'',

    parent_list:'',
  },


  /**
   * 绑定码
   */
  inputname:function(e){
    console.log(e);
      this.setData({
        bind_code:e.detail.value,
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // my.hideShareMenu({

    // });
    console.log(options);
    if (options.page) {
      this.setData({
        tag: options.page, 
        relation: options.relation,
      })
    }

    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    this.setData({
      mid: muid,
      token: mtoken,
      child: app.globalData.child,
      bind_by: app.globalData.child.bind_by,
      parent_list: app.globalData.child.parent_list,
    })
  
  },

  

 /**
   * 点击确定提交数据
   */
  confirm: function() {
    if (!this.data.bind_code){
        util.toastTap("请输入绑定号");
      return;
    }

    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": app.globalData.child.child_mid,
      "bind_no": this.data.bind_code,
      "relation": this.data.relation,
    }


      http.request(api.memberbindchild, data, this.data.token, ).then(function (item) {
        if (item.code == 0) {
          my.setStorageSync('logininfo', item.data)
          my.setStorageSync('uid', item.data.mid)
          my.setStorageSync('token', item.data.token)
          app.globalData.childlistfresh = true;
          if (that.data.tag) {
            my.navigateBack({
              delta: 3
            })
          } else {
            my.reLaunch({
              url: '../../parenthome',
            })
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