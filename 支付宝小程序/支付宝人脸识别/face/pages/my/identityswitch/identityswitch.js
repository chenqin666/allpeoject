// pages/my/identityswitch/identityswitch.js
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
    logininfo: '',

    isparent:'',
    isteacher:'',
    mid: '',
    token: '',
  },



  /**
   * 切换角色
   */
  switchrole: function (event) {
    var roleid=event.currentTarget.dataset.roleid;
    console.log(event);
    if (roleid == this.data.logininfo.selected_member_type){
      my.navigateBack({

      })
      return;
    }

    const that = this;
    const data = {
      "mid": this.data.mid,
      "member_type": roleid==2?"teacher":"parent",
    }
    http.request(api.membertypeselect, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        my.setStorageSync('logininfo', result.data)
        my.setStorageSync('uid', result.data.mid)
        my.setStorageSync('token', result.data.token)

        app.globalData.mainrefresh = true;
        if (result.data.selected_member_type==3){
          my.switchTab({
            url: '../../parenthome/parenthome',
          })
        } else if (result.data.selected_member_type == 2){
          my.switchTab({
            url: '../../parenthome/parenthome',
          })
        }
       
      }
    })
  },
  showDialog: function () {
    this.dialog.showDialog();
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    var logindata=my.getStorageSync("logininfo");
    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
    })
    
    for (var i = 0; i < logindata.member_type_array.length; i++)
    {

      if (logindata.member_type_array[i] == 2) {
        this.setData({
          isteacher:true          
        })
      }

      if (logindata.member_type_array[i]==3){
        this.setData({
          isparent: true
        })
      }
    }

    console.log("isteacher==" + this.data.isteacher);
    console.log("isparent==" + this.data.isparent);
  


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
  },
})