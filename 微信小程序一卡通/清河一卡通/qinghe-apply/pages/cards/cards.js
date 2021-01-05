// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    leaveStartShown: false,
    user: '',
    originHeight: '',
    screenHeight: '',
    isOriginHeight: true,
    cardlists: [],//卡片列表
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    // this.card_lists()
  },
  // 卡号查询
  cardsearch() {
    wx.navigateTo({
      url: '../cardsearch/cardsearch',
    })
  },
  // 操作说明
  toimage() {
    wx.navigateTo({
      url: '../images/images',
    })
  },
  // 绑定一卡通
  bindcard() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 点击卡片进入详情
   */
  tocarddetail:function(e) {
    let items = e.currentTarget.dataset.item
    wx.navigateTo({
        url: '../mainsucess/mainsucess',
      })
    wx.setStorageSync('snumber', items.card_no)
    wx.setStorageSync('childid', items.child_mid)
    wx.setStorageSync('stu_name', items.stu_name)
    wx.setStorageSync('school_name', items.school_name)
      
  },
  /**
   * 卡片列表
   */
  card_lists: function (type) {
    const that = this;
    const data = {
      "mid": wx.getStorageSync("mid")
    }
    var appid = 'wxff99d05d31a2bb39';
    http.request(api.bindcards, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
      if (result.code == 0) {
         // 授权成功并且服务器端登录成功
        if (result.data) {
          that.cardlists = result.data
          that.setData({
            cardlists: result.data,
          });
        }
        else {
          that.setData({
            cardlists: [],
            leaveStartShown: true,
          });
        }
        
      }
      else {
        util.toastTap(res.msg);
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })


  },
  // 监听生命周期回调 onShow
  onShow() {
    this.card_lists()
  },
  // 事件处理函数
  onTodoChanged(e) {
    // 修改全局数据
    const checkedTodos = e.detail.value;
    app.todos = app.todos.map(todo => ({
      ...todo,
      completed: checkedTodos.indexOf(todo.text) > -1,
    }));
    this.setData({ todos: app.todos });
  },

});
