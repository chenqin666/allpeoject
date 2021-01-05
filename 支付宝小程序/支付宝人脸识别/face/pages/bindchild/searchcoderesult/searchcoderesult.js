// pages/parenthome/bindchild/searchcoderesult/searchcoderesult.js
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
    name:'',
    grade_class_name: '', 
    code: '',
    password:'',
    isNormal:'',
  },


/**
 *  复制学生编号
 */
  copycode:function(){
    my.setClipboardData({
      data: this.data.code,
      success: function (res) {
       util.toastTap("学生编号复制成功");
      }
    })
  },

  /**
 *  复制一卡通密码
 */
  copypassword: function () {
    my.setClipboardData({
      data: this.data.password,
      success: function (res) {
        util.toastTap("一卡通初始密码复制成功");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // my.hideShareMenu({

    // });
    if (options.obj && options.obj !="undefined"){
      var params = options.obj;
      var data = JSON.parse(params);
      console.log(data);
      this.setData({
        name : data.username,
        grade_class_name: data.grade_name + data.class_name,
        code: data.member_sn,
        password: data.init_password,
        isNormal:true,
      });

    }else{
      this.setData({
        name: data.username,
        grade_class_name: data.grade_name + data.class_name,
        code: data.member_sn,
        password: data.init_password,
        isNormal: false,
      });
    }
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