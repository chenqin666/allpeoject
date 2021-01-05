// pages/totalview/totalview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mid:'',
      token:'',
    logininfo:'',
    list: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var muid = wx.getStorageSync("uid");
    var mtoken = wx.getStorageSync("token");
    var logindata = wx.getStorageSync("logininfo");

    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
    
    })
  },


  /**
    * 获取班级列表
    */
  getList: function () {
    const that = this;
    const data = {
      "uid": this.data.mid,
    }
    http.request(api.schoolexecuteschoollist, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        if (!result.data) {
          that.setData({
            list: [],
          })
        } else {
          that.setData({
            list: result.data,
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

  }
})