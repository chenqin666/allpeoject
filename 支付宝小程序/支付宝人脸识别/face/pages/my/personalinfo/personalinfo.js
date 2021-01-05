// pages/my/personalinfo/personalinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logininfo:'',
    headerurl: '',

    hidden:true,
    role:"",
  },

  chang_mobile:function(){
      my.navigateTo({
        url: 'changemobile/changemobile',
      })
  },

  /**
   * 选择角色
   */
  pickrole: function (e) {
    console.log(e);
    this.setData({
      role: e.detail.value,
    })

  },
  /**
   * 显示选择角色对话框
   */
  showPickrole: function () {
    this.setData({
      hidden: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   var loginData= my.getStorageSync("logininfo");
      this.setData({
        logininfo: loginData,
        headerurl: loginData.profile_url ? loginData.profile_url: "../../../assets/icon_header_default.png",
      });

    
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
    this.setData({
      logininfo: my.getStorageSync("logininfo"),

    });
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