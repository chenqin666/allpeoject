// pages/my/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    mobile: "",
    hidden: true,
  },

  /**
   * 关于我们
   */
  go2about: function() {
    my.navigateTo({
      url: 'about/about',
    })
  },
  /**
   * 使用帮助
   */
  go2help: function() {
    const targeturl = '../../common/h5page/h5page?url=' + "https://m.fangao.100eks.com/helpparent.html" + "&title=" + "使用帮助";
    console.log(targeturl)
    my.navigateTo({
      url: targeturl
    })
  },

  /**
   * 联系客服
   */
  go2service: function() {
    this.setData({
      time: "点击复制微信号",
      mobile: "fangao_1",
      hidden: false,
    });
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    //获得dialog组件
    this.customerservice = this.selectComponent("#customerservice");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      time: "点击复制微信号",
      mobile: "fangao_1",
      hidden: false,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      time: "点击复制微信号",
      mobile: "fangao_1",
      hidden: false,
    });
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