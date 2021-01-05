// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
   cardnumber:'',
    stunames:'',
    cardmid:'',
    cardlists:'',
    moneys:'',
    totips: false,//弹框
    options: [{
        label: '10',
      value: '10'
    },
    {
        label: '50',
        value: '50'
    },
    {
        label: '100',
        value: '100'
    },
    {
        label: '200',
        value: '200'
    },{
        label: '300',
        value: '300'
    },
    {
        label: '500',
        value: '500'
    }
    ], 
    optionsone: [{
      label: '0.01',
      value: '0.01'
    }
    ],
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    this.card_lists()
    this.setData({
      stunames: wx.getStorageSync("stu_name"),
      cardnumber: wx.getStorageSync("snumber"),
      // cardnumber:12345,
      childid: wx.getStorageSync("childid"),
      mid: wx.getStorageSync("mid"),
    });
  
  },
  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据
    this.setData({ todos: app.todos });
  },
  // 充值
  go2recharge() {
    if (this.data.moneys == '') {
        util.toastTap('请选择金额');
        return false;
      } 
     
    const that = this;
    let aaa = that.data.moneys - (that.data.moneys * that.data.cardlists)
    wx.showModal({
      title: '实际到账金额' + aaa+'元',
      success: function (res) {
        if (res.confirm) {
          that.confirmpsd()
          console.log('弹框后点取消')
        } else {
          console.log('弹框后点取消')
        }
      }
     
    })
  },

  /**
   *  点击item
   */
  onTypeClick_one: function(e) {
    var id = e.currentTarget.dataset.item.value;
    this.setData({
      moneys: id,
    });
  },
 /*支付宝支付*/
  confirmpsd: function (){
     const that = this;
      if (this.data.moneys == '') {
        util.toastTap('请选择金额');
        return false;
      } 
      const data = {
        "mid": wx.getStorageSync("mid"),
        "card_num": wx.getStorageSync("snumber"), 
        "stu_name": wx.getStorageSync("stu_name"),
        "fee": that.data.moneys, 
         "pay_type": "wechat"
      }
      http.request(api.payment, data, wx.getStorageSync("token"), '','').then(function (result) {
        if (result.code == 0) {
          that.setData({
            totips: false
          });
          that.goWxPay(result.data);
        }
        else {
          util.toastTap(result.msg);
        }
      })
    },

  /**
   * 调起微信
   */
  goWxPay: function (event) {
    wx.requestPayment({
      'timeStamp': String(event.timestamp),
      'nonceStr': event.nonce_str,
      'package': 'prepay_id=' + event.prepay_id,
      'signType': 'MD5',
      'paySign': event.sign_new,
      'success': function (res) {
        // util.toastTap("支付成功");

        wx.showModal({
          content:  "您已支付成功，请通知孩子刷卡领款，领款成功后余额将会更新。",
          showCancel: false,
          confirmText: "知道了",
          success: function (res) {
  　　　　　　if (res.cancel) {
    　　　　　　　//点击取消,默认隐藏弹框
  　　　　　　} else {
    　　　　　　　//点击确定
                 wx.navigateTo({ url: '../mainsucess/mainsucess' });
    　　　　　　};
          }
        })

        app.globalData.refreshValidDate = true;
        app.globalData.warningLevel = 0;
       

      },
      'fail': function (res) {
        if ("fail cancel" == res.requestPayment) {
          util.toastTap("用户取消支付");
        } else {
          util.toastTap(res.requestPayment);
        }
      },
      'complete': function (res) {

      }
    })
  },
  // 实际到账金额
  card_lists: function (type) {
    const that = this;
    const data = {
      "mid": wx.getStorageSync("mid"),
      "card_num": wx.getStorageSync("snumber"), 
      "school_id": wx.getStorageSync("school_id")
    }
    http.request(api.feepercent, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        // 授权成功并且服务器端登录成功
        that.cardlists = result.data.service_fee_percent
        that.setData({
          cardlists: result.data.service_fee_percent
        });
        
      }
      else {
        util.toastTap(result.msg);
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })},
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
    wx.navigateTo({ url: '../add-todo/add-todo' });
  },

});
