// pages/my/childdetail/childdetail.js
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
    mid: '',
    token: '',
    selectedchild:"",
    parent_list:[],


    hidden: true,
    role: "",
  },


  /**
   * 选择角色
   */
  pickrole: function (e) {
   
    this.setData({
      role: e.detail.value,
    })
    this.updaterole();
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
   * 点击解绑
   */
  onbtnClick: function (event) {
  
    this.setData({
      alertcontent: "确定要解除" + this.data.selectedchild.username + "的绑定吗？",
    });
    this.showDialog();
  },
  showDialog: function () {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent: function () {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent: function () {
    console.log('你点击了确定');
    this.dialog.hideDialog();
    this.unBinder();
  },
  /**
     * 解绑
     */
  unBinder: function () {
    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": this.data.selectedchild.child_mid,
    }
    http.request(api.memberunbindchild, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        my.setStorageSync('logininfo', result.data)
        my.setStorageSync('uid', result.data.mid)
        my.setStorageSync('token', result.data.token)
        app.globalData.mainrefresh = true;
        app.globalData.childlistfresh=true;
        my.navigateBack({
          
        });
      }
    })
  },


    /**
      * 获取孩子详情
      */
  getchilidDetail: function () {
    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": this.data.selectedchild.child_mid,
    }
    http.request(api.memberchilddetailquery, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        that.setData({
          selectedchild: result.data.child_info,
          parent_list: result.data.parent_list,
        });
      }
    })
  },


  /**
    * 更改家长角色信息
    */
  updaterole: function () {
    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": this.data.selectedchild.child_mid,
      "relation":that.data.role,
    }
    
    http.request(api.memberchildupdaterelation, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        var parent_list_new = that.data.parent_list;
        for (var i = 0; i < parent_list_new.length;i++){
          if (parent_list_new[i].is_self==1){
            parent_list_new[i].relation = that.data.role;
          }
        }
        that.setData({
          parent_list: parent_list_new,
        });
        if (that.data.logininfo.last_login_student.child_mid == that.data.selectedchild.child_mid){//如果修改的是当前查看的孩子，需要更新登录信息中的家长角色
          that.data.logininfo.last_login_student.relation = that.data.role;
        // var newinfo=  JSON.stringify(that.data.logininfo);
      
          my.setStorageSync('logininfo', that.data.logininfo);
        }
        

      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: my.getStorageSync("logininfo"),
      selectedchild: app.globalData.selectedchild,
    })
    
    this.getchilidDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
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