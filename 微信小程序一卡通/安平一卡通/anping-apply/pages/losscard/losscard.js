// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
     cardnumber:'',
    childidnumber:'',
    stunames:'',
    cardmid:'',
    status:'',
    repassword:'',
    jiebangpass:''
  },
  jieinput: function (e) {
    this.setData({
      jiebangpass: e.detail.value
    })
  },
   //提交信息
    to_payment: function (){
      const that = this;
      // if (this.data.jiebangpass == '') {
      //   util.toastTap('请输入密码');
      //   return false;
      // } 
      const data = {
        "mid": wx.getStorageSync("mid"),
        "stu_name": wx.getStorageSync("stu_name"),
        "card_num": wx.getStorageSync("snumber")
      }
      var appid = 'wxd2fc8679c204c2d0';
      http.request(api.unbind, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
        if (result.code == 0) {
          util.toastTap(result.msg);
            wx.navigateTo({
              url: '../cards/cards',
            })
          that.setData({
            // wxcode: result.data.mp_title
          });
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
  // 监听生命周期回调 onLoad
  onLoad() {
   // 卡片信息
    // this.cardnumber=sessionStorage.snumber
    // this.childidnumber=sessionStorage.childid
    // this.stunames=sessionStorage.stu_name
    // this.cardmid=sessionStorage.mid
    
    this.setData({
      stunames: wx.getStorageSync("stu_name"),
      cardnumber: wx.getStorageSync("snumber"),
      childid: wx.getStorageSync("childid"),
      mid: wx.getStorageSync("mid"),
    });
    // const that = this;
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
