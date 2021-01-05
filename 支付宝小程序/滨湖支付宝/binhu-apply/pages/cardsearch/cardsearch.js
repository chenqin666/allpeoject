// 获取全局 app 实例
const util = require('../../utils/util.js');
const app = getApp();

Page({
  // 声明页面数据
  data: {
    names: '',
    data:'',
    cardnumbers:'',
    returnnumber: '',
    getstora:{},
    getstoraone:{},
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
    // debugger
     my.setClipboard({
      text: that.data.returnnumber,
      success: function (res) {
        my.showToast({
        type: 'error',
        content: '复制成功',
        duration: 1500
      });
      }
    });

    
  },
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    var that=this;
    that.getstora = my.getStorageSync({
      key: 'carditem',
    });
     that.getstoraone = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
  },
  getAudit: function (){
  const that = this; 
    if (that.Trim(that.data.names)== '') {
      my.showToast({
        content: '请填写姓名'
      });
      return false;
    }
    if (that.Trim(that.data.cardnumbers)== '') {
      my.showToast({
         content: '请填写身份证号'
      });
      return false;
    }
    const data = { 
     "mid":that.getstoraone.data.mid,
      "stu_name":that.data.names,
      "id_card":that.data.cardnumbers,
    };
   my.showLoading({
      title: '加载中',
    })
    
   my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/member.find.card', 
        data: {
          request: JSON.stringify(data)
        },
        headers: {
          //  'Content-Type': 'application/x-www-form-urlencoded',
           "token":that.getstoraone.data.token,
          'appid':'2019090867140192'
        },
        dataType: "json",
        success: (res) => {
          
         if (res.data.code == 0) {
           my.hideLoading();
            that.setData({
            returnnumber: res.data.data.outid,
          });
          }
        else {
          my.hideLoading();
          my.showToast({
              content: res.data.msg,
            });
          
          that.setData({
            returnnumber: '',
          });
          }
          
        },
        fail: (res) => {
          my.showToast({
            content: '网络错误,请重试！',
          });
          my.hideLoading();
        },
      });
    
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
