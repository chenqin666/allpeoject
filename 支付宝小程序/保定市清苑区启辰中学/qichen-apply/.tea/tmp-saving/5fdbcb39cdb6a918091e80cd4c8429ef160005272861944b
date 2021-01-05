// 获取全局 app 实例
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
     
      my.showToast({
        type: 'error',
        content: '请填写原密码',
        duration: 1500
      });
      return false;
    }
    
    if (this.Trim(this.data.new_psd) == '') {
     
     my.showToast({
        type: 'error',
        content: '请填写新密码',
        duration: 1500
      });
      return false;
    } 
    if (this.Trim(this.data.shue_psd) == '') {
     
     my.showToast({
        type: 'error',
        content: '请填确认查询密码',
        duration: 1500
      });
      return false;
    } 
   if (this.Trim(this.data.shue_psd)!=this.Trim(this.data.new_psd)) {
     
     my.showToast({
        type: 'error',
        content: '新密码和确认密码输入不一致',
        duration: 1500
      });
      return false;
    } 

    const data = { 
      // "card_num":sessionStorage.snumber,
      // "mid":sessionStorage.mid,
      // "new_password":that.new_psd,
      // "password":that.first_psd,
    };

     my.showLoading({
      title: '加载中',
    })
    
     my.httpRequest({
        method: 'POST',
        url: 'http://api.ykt.100eks.cn/gzxs.member.update.password', 
        // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
        data: {
          request: JSON.stringify(data)
        },
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          //  "token":11111
          //  sessionStorage.token
          'appid':'2021001193630999'
        },
        dataType: "json",
        success: (res) => {
             if (res.code == 0) {
                that.errorTips('密码修改成功');
                  my.navigateTo({ url: '../cards/cards' });
              }
            else {
                my.showToast({
                  content: res.msg,
                });
          }
        },
        fail: (res) => {
          // 根据自己的业务场景来进行错误处理
          my.showToast({
            content: '网络错误,请重试！',
          });
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
