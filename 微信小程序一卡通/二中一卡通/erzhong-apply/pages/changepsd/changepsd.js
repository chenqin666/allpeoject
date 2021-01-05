// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    stu_name:'',
    id_card:'',
    finish_school_name:'',
    data:'',
    user:'',
    first_psd:'',//原密码
    new_psd:'',//新密码
    shue_psd:'',//确认密码
  },
    mobileinput: function (e) {
      this.setData({
        first_psd: e.detail.value
      })
    },
    codeinput: function (e) {
      this.setData({
        new_psd: e.detail.value
      })
    },
    passwordinput: function (e) {
      this.setData({
        shue_psd: e.detail.value
      })
  },
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 监听生命周期回调 onLoad
  onLoad() {
   
  },
  getAudit: function (){
   const that = this; 
    if (this.Trim(this.data.first_psd)== '') {
      util.toastTap('请填写原密码');
      return false;
    }
    
    if (this.Trim(this.data.new_psd) == '') {
      util.toastTap('请填写新密码');
     
      return false;
    } 
    if (this.Trim(this.data.shue_psd) == '') {
      util.toastTap('请填确认查询密码');
     
      return false;
    } 
   if (this.Trim(this.data.shue_psd)!=this.Trim(this.data.new_psd)) {
      util.toastTap('新密码和确认密码输入不一致');
     
      return false;
    } 

    const data = { 
      // "card_num":sessionStorage.snumber,
      // "mid":sessionStorage.mid,
      // "new_password":this.data.new_psd,
      // "password":this.data.first_psd,
    };

    //  my.showLoading({
    //   title: '加载中',
    // })
    
    http.request(api.unbind, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
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

  addTodo() {
    // 进行页面跳转
    my.navigateTo({ url: '../add-todo/add-todo' });
  },
});
