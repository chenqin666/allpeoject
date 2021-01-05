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
    popupVisible: false,
    returnnumber: '',
    toclass: '',
    dataArr: ['2019级', '2018级', '2017级', '2019级', '2018级','2017级'],
    array: ['初一', '初二', '初三', '高一', '高二', '高三'],
    monthyfirst:'',
    arrIndex: '',
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
  //激活picker组件
  showmonth(e, value) {
    this.popupVisible = true;
  },
  bindObjPickerChange(e) {
    const that = this;
    let aaa = e.detail.value
   that.setData({
      arrIndex: e.detail.value
    });
   
    for (var i = 0; i < that.data.array.length; i++) {
      if (i == that.data.arrIndex) {
        that.setData({
          monthyfirst: that.data.array[i]
        })
      }
    }

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
    const that = this; 
    
  },
  getAudit: function (){
   const that = this; 
    for (var i = 0; i < that.data.dataArr.length; i++) {
      if (i == that.data.arrIndex) {
        that.setData({
          toclass: that.data.dataArr[i]
        })
      }
    }
    console.log(that.data.toclass);
    if (that.data.toclass == '') {
      util.toastTap('请选择年级');
      return false;
    }
    if (that.data.cardnumbers == '') {
      util.toastTap('请填写所在班级');
      return false;
    } 
    if (that.data.names== '') {
      util.toastTap('请填写姓名');
      return false;
    }
   
    const data = { 
      "mid":wx.getStorageSync("mid"),
      "stu_name":that.data.names,
      "class_name":that.data.cardnumbers,
      "grade_name": that.data.toclass
    };
    
    wx.showLoading({
      title: '加载中',
    })
    // wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });

    http.request(api.findcard, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
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
          returnnumber:'',
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
