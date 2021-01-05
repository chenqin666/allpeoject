// 获取全局 app 实例
const app = getApp();

Page({
  // 声明页面数据
  data: {
     cardnumber:'',
    childidnumber:'',
    stunames:'1111',
    getstora:'',
    cardmid:'',
    status:'',
    repassword:'',
  },
  jieinput: function (e) {
    this.setData({
      repassword: e.detail.value
    })
  },
   //提交信息
    to_payment: function (){
       var that=this;
    const data = { 
      // order_sn: sessionStorage.order_sn,
      // pay_type: "alipayH5",
      // stu_id: sessionStorage.stu_id
    };

     my.showLoading({
      title: '加载中',
    })
    
     my.httpRequest({
        method: 'POST',
        url: 'http://api.ykt.100eks.cn/gzxs.member.unbund.card', 
        data: {
          request: JSON.stringify(data)
        },
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          //  "token":11111
          //  sessionStorage.token
          'appid':'2021001191614106'
        },
        dataType: "json",
        success: (res) => {
            if (data.code == 0) {
                that.errorTips('挂失成功！');
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
  // 监听生命周期回调 onLoad
  onLoad() {
    this.getstora = my.getStorageSync({
      key: 'logins', // 缓存数据的key
    });
   // 卡片信息
   this.setData({
      cardnumber: this.getstora.data.mobile,
      childidnumber: this.getstora.data.childid,
      stunames: this.getstora.data.name,
      cardmid: this.getstora.data.mid,
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
