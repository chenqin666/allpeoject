// pages/parenthome/bindchild/bindchild.js
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

    pagetype: 0,
    name: '',
    code: '',

    mid: '',
    token: '',
    tag: '',

    school: '',

    hidden:true,
    role:'',
  },

  inputname: function(e) {
    this.setData({

      name: e.detail.value
    })
  },

  inputcode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

/**
 * 查询学生编号
 */
  searchcode:function(){
      my.navigateTo({
        url: 'searchcode/searchcode',
      })
  },

  confirm: function() {

      my.navigateTo({
      url: 'childdetail/childdetail',
    })
    return;
    
    if (this.data.name == null || this.data.name.trim() == '') {
      util.toastTap("请输入所在学校名称");
      return;
    }

    if (this.data.code == null || this.data.code.trim() == '') {
      util.toastTap("请输入就餐学生身份证号");
      return;
    }

    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_sn": this.data.code,
      "child_name": this.data.name,
    }
   
    console.log(this.data.token);
    http.request(api.membersearchchild, data, this.data.token, ).then(function(item) {
      if (item.code == 0) {
        app.globalData.child = item.data;
        var targeturl='';
        if (that.data.tag ){
          targeturl = "childdetail/childdetail?page=" + that.data.tag + "&relation=" + that.data.role;
        }else{
         
          targeturl = "childdetail/childdetail?relation=" + that.data.role;
         
        }
        console.log(targeturl);

      
        my.navigateTo({
          url: targeturl,
        })

      }
    })



  },

  /**
   *  获取学校列表
   */
  getSchoolList: function() {
    const that = this;
    const data = {
      "mid": this.data.mid,
    }
    http.request(api.schoollistquery, data, this.data.token, ).then(function(result) {
      if (result.code == 0) {
        if(result.data.length==1){
          that.setData({
            school:result.data[0],
          });
        }
        
      }
    })
  },


  /**
   *  跳转到选择学校
   */
  onselectschool: function() {
    var targeturl = this.data.school ? ("schoollist/schoollist?schoolid=" + this.data.school.school_id) : "schoollist/schoollist"

    my.navigateTo({
      url: targeturl,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    if (options.page) {
      this.setData({
        tag: options.page,
      })

    }
    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    this.setData({
      mid: muid,
      token: mtoken,
      pagetype: options.pagetype ? options.pagetype : 0,
    })

    // this.getSchoolList();
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
    // if (app.globalData.school) {
    //   this.setData({
    //     school: app.globalData.school,
    //   });
    //   app.globalData.school = '';
    // }
    // if (app.globalData.card_number){
    //   this.setData({
    //     code: app.globalData.card_number,
    //   });
    //   app.globalData.card_number='';
    // }

  },

/**
 * 选择角色
 */
  pickrole:function(e){
    console.log(e);
    this.setData({
      role: e.detail.value,
    })
  
  },
/**
 * 显示选择角色对话框
 */
  showPickrole:function(){
      this.setData({
        hidden:false,
      })
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