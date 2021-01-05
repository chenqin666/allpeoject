// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    leaveStartShown: false,
    details: '',
    tempFilePaths:'',
    errMsg:'',
  },
  // 监听生命周期回调 onLoad
  onLoad() {
  
  },
  
  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据
    this.setData({ 
      details: wx.getStorageSync('searchData'),
      tempFilePaths: wx.getStorageSync('tempFilePaths'),
      errMsg:wx.getStorageSync('errMsg')
    });
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
