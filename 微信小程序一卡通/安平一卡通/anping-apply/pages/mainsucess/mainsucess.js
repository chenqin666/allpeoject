const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  data: {
    school_name:'',
    jiebangpass:'',//解绑密码
    user:'',
    originHeight: '',
    screenHeight: '',
    isOriginHeight: true,
    cardnumber:'',
    childidnumber:'',
    cardmid:'',
    stunames:'',
    datalist:'',
     totips:false,//弹框
  },

  onBlur(e) {
    
  },

   jieinput: function (e) {
    this.setData({
      jiebangpass: e.detail.value
    })
  },
  fgyun(){
    wx.navigateTo({
        url: '../hhh/hhh',
      })
  },
  gotohelp() {
    wx.navigateTo({
      url: '../helps/helps',
    })
  },
  // 充值
  leftmoney(){
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  // 订单详情
  dingdetail() {
    wx.navigateTo({
      url: '../dingdetail/dingdetail'
    })
  },
  // 充值明细
  centermoney() {
    wx.navigateTo({
      url: '../detailrech/detailrech'
    })
  },
  // 交易明细
   rightmoney(){
    wx.navigateTo({
      url: '../details/details'
    })
  },
  // 卡挂失
  realcard(){
    wx.navigateTo({
      url: '../losscard/losscard'
    })
  },
  // 修改密码
  realpsaaword(){
    wx.navigateTo({
      url: '../changepsd/changepsd'
    })
  },
 
  // 解绑一卡通
  untrying(){
    this.setData({
        totips: !this.totips
      });
  },
  
  cancel(){
    this.setData({
        totips: false
      });
  },
  // 确定弹框
    confirmpsd(){
      var that=this;
      // if(!that.data.jiebangpass){
      //      util.toastTap('请输入密码');
			// 		return false;
      //  }
      const data = {
        "mid": wx.getStorageSync("mid"),
        "stu_name": wx.getStorageSync("stu_name"),
        "card_num": wx.getStorageSync("snumber")
      }
      var appid = 'wxd2fc8679c204c2d0';
      http.request(api.unbind, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
        if (result.code == 0) {
          util.toastTap(result.msg);
          that.setData({
            totips: false
          });
          wx.navigateTo({
            url: '../cards/cards'
          })
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
  // 余款查询
  search(){
      wx.navigateTo({
        url: '../searchall/searchall'
      })
  },
  carddetails(){
    var that = this;
    const data = {
      "mid": wx.getStorageSync("mid"),
      "stu_name": wx.getStorageSync("stu_name"),
      "card_num": wx.getStorageSync("snumber")
    }
    var appid = 'wxd2fc8679c204c2d0';
    http.request(api.detail, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
      if (result.code == 0) {
        // util.toastTap(result.msg);
        that.setData({
          datalist: result.data,
          school_id: wx.setStorageSync('school_id', result.data.school_id)
        });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    this.setData({
      school_name: wx.getStorageSync("school_name"),
      snumber: wx.getStorageSync("snumber"),
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
    // 卡片详情
    this.carddetails()
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
});
