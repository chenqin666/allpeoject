// pages/my/childlist/childlist.js
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
    frompage:'',
    logininfo:'',
    list:[
      {
        academic: "",
        campus_id: 273,
        campus_name: "校本部",
        card_number: "200102",
        child_mid: 2,
        class_id: 328,
        class_name: "2001班",
        grade_id: 275,
        grade_name: "一年级",
        member_sn: "200102",
        profile_url: "",
        school_id: 1,
        school_name: "河北武邑中学",
        student_status: 0,
        username: "王涛",
        valid_date: "0000-00-00 00:00:00",
      },
      {
        academic: "",
        campus_id: 273,
        campus_name: "校本部",
        card_number: "200102",
        child_mid: 2,
        class_id: 328,
        class_name: "2001班",
        grade_id: 275,
        grade_name: "一年级",
        member_sn: "200102",
        profile_url: "",
        school_id: 1,
        school_name: "111河北武邑中学",
        student_status: 0,
        username: "王涛111",
        valid_date: "0000-00-00 00:00:00",
      },
      {
        academic: "",
        campus_id: 273,
        campus_name: "校本部",
        card_number: "200102",
        child_mid: 2,
        class_id: 328,
        class_name: "2001班",
        grade_id: 275,
        grade_name: "一年级",
        member_sn: "200102",
        profile_url: "",
        school_id: 1,
        school_name: "222河北武邑中学",
        student_status: 0,
        username: "王涛222",
        valid_date: "0000-00-00 00:00:00",
      }
    ],
    mid: '',
    token: '',

    alertcontent:'',
    unbindChilidindex:'',
  },

  /**
   * 切换
   */
  onItemClick:function(event){
    console.log("onItemClick");
    if (this.data.frompage && this.data.frompage=="list"){
      app.globalData.selectedchild = event.currentTarget.dataset.item;
        my.navigateTo({
          url: '../childdetail/childdetail',
        })
      return;
    }
    if (this.data.logininfo.last_login_student.child_mid == event.currentTarget.dataset.item.child_mid){
      my.navigateBack({
        
      })
      return;
    }

    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": event.currentTarget.dataset.item.child_mid,
    }
    http.request(api.memberchildselect, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        my.setStorageSync('logininfo', result.data)
        my.setStorageSync('uid', result.data.mid)
        my.setStorageSync('token', result.data.token)

        that.setData({
          mid: result.data.mid,
          token: result.data.token,
          logininfo: result.data,
        });
        app.globalData.mainrefresh = true;
        my.navigateBack({

        })
      }
    })
  },
  


  /**
   * 点击解绑
   */
  onbtnClick: function (event) {
    console.log("onbtnClick");
    var index = event.currentTarget.dataset.index;
    this.setData({
      alertcontent: "确定要解除" + this.data.list[index].username+"的绑定吗？",
      unbindChilidindex: index,
    });
    this.showDialog();
  },
/**
   * 解绑
   */
  unBinder: function (){
    const that = this;
    const data = {
      "mid": this.data.mid,
      "child_mid": this.data.list[this.data.unbindChilidindex].child_mid,
    }
    http.request(api.memberunbindchild, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        my.setStorageSync('logininfo', result.data)
        my.setStorageSync('uid', result.data.mid)
        my.setStorageSync('token', result.data.token)

        var newList = that.data.list;
        newList.splice(that.data.unbindChilidindex, 1);
        that.setData({
          list: newList,
          mid: result.data.mid,
          token: result.data.token,
          logininfo:result.data,
        });
        app.globalData.mainrefresh = true;
      }
    })
  },


  /**
   * 获取孩子列表
   */
  getList: function () {
    const that = this;
    const data = {
      "mid": this.data.mid,
    }
    http.request(api.memberchildquery, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        if(!result.data){
          that.setData({
            list: [],
          });
        }else{
          that.setData({
            list: result.data,
          });
        }
       
      }
    })
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


  //添加孩子
  onClickAdd:function(){
   
    my.navigateTo({
      url: '../../parenthome/bindchild/bindchild?page=list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var pagetag='';
    if (options.from) {
       pagetag = options.from;
    }
    
    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    this.setData({
      frompage: pagetag,
      mid: muid,
      token: mtoken,
      logininfo: my.getStorageSync("logininfo"),
    })

    // this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    // this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (app.globalData.childlistfresh==true){
    //   app.globalData.childlistfresh=false;
    //   var muid = my.getStorageSync("uid");
    //   var mtoken = my.getStorageSync("token");
    //   this.setData({
    //     mid: muid,
    //     token: mtoken,
    //     logininfo: my.getStorageSync("logininfo"),
    //   })
    //   // this.getList();
    // }
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