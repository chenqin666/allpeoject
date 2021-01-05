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
    popupVisible:false,
    detailall: [],
    dataArr:[],
    dataArrs:[],
    pickerVal:'',//获取月份
    arrIndex:'',
    monthy:'',
    monthyfirst:''
  },
  // 监听生命周期回调 onLoad
  onLoad() {
   // 获取当前月份的前几个月
   this.month()
  // 获取记录详情
  this.getDetail();
  },
   // 获取当前月份
    month(){
      const that = this;
        this.dataArr = [];
        var data = new Date();
        var year = data.getFullYear();
        data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
        for (var i = 0; i < 4; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            var m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            that.dataArr.unshift(data.getFullYear() + "-" + (m))
        }
        that.setData({
          dataArr: that.dataArr
        })
    },
     //激活picker组件
    showmonth(e,value){
        this.popupVisible=true;
    },
    bindObjPickerChange(e) {
      const that = this;
      console.log('picker发送选择改变，携带值为', e.detail.value);
      console.log(that.dataArr);
      that.setData({
        arrIndex: e.detail.value
      });
     for (var i = 0; i < that.dataArr.length; i++) {
       if (i == that.data.arrIndex){
          that.setData({
            monthyfirst: that.dataArr[i]
          })
        }
      }
      that.getDetail();
    },
     // 获取记录详情
    getDetail: function () {
      wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
       var that=this;
      const data = {
        "mid": wx.getStorageSync("mid"),
        "card_num": wx.getStorageSync("snumber"),
        "date": this.data.monthyfirst
        
      }
      var appid = 'wxd2fc8679c204c2d0';
      http.request(api.monthlist, data, wx.getStorageSync("token"), appid, '', true).then(function (result) {
        if (result.code == 0) {
          wx.hideLoading()
         
          that.setData({ 
            detailall: result.data.list,
            monthy :result.data.month,
            leaveStartShown: true,
            });
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

});
