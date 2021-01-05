// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    names: '',
    data:'',
    cardnumbers:'',
    returnnumber: '',
  },
  // 姓名
  nameinput: function (e) {
      this.setData({
        names: e.detail.value
      })
    },
    // 身份证号
  codeinput: function (e) {
      this.setData({
        cardnumbers: e.detail.value
      })
    },
    // 复制
  call: function () {
    const that = this;
    wx.setClipboardData({
      data: that.data.returnnumber,
      success: function (res) {
        util.toastTap("复制成功");
      }
    })

  },
  /**
   * 去空格
   */
  // Trim: function (str) {
  //   return str.replace(/(^\s*)|(\s*$)/g, "");
  // },
  // 监听生命周期回调 onLoad
  onLoad() {
   
  },
  getAudit: function (){
   const that = this; 
    if (that.data.names== '') {
      util.toastTap('请填写姓名');
      return false;
    }
    if (that.data.cardnumbers == '') {
      util.toastTap('请填写身份证号');
      return false;
    } 
    const data = { 
      "mid":wx.getStorageSync("mid"),
      "stu_name":that.data.names,
      "id_card":that.data.cardnumbers,
    };

    wx.showLoading({
      title: '加载中',
    })
    // wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
    var appid = 'wxff99d05d31a2bb39';
    http.request(api.findcard, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
      if (result.code == 0) {
        util.toastTap('查询成功');
        that.setData({
          returnnumber: result.data.outid,
        });
        wx.hideLoading()
      }
      else {
        util.toastTap(result.msg);
        that.setData({
          returnnumber: '',
        });
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
    
  },
  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据
    this.setData({ todos: app.todos });
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
