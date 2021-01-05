// 获取全局 app 实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  // 声明页面数据
  data: {
    getstora:{},
    user: '',
    items:{},
    originHeight: '',
    childid: '',
    snumber: '',
    stu_name: '',
    school_name: '',
    screenHeight: '',
    isOriginHeight: true,
    cardlists: [],//卡片列表
  },
  // 监听生命周期回调 onLoad
  onLoad() {
    this.getstora = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
  },
  //添加孩子
  onClickAdd:function(){
  //  ?page=list
    my.navigateTo({
      url: '../bindchild/bindchild',
    })
  },
  // 更多
  gomore() {
    my.navigateTo({
      url: '../details/details',
    })
  },
  // 人脸识别
  goface() {
    my.navigateTo({
      url: '../face/face',
    })
  },
  // 支付功能
  gopay() {
    my.navigateTo({
      url: '../pay/pay',
    })
  },
  // 卡号查询
  cardsearch() {
    my.navigateTo({
      url: '../cardsearch/cardsearch',
    })
  },
 
  // 绑定一卡通
  bindcard() {
      my.navigateTo({
      url: '../login/login',
      // url: '../firstlogin/firstlogin',
    })
  },
  /**
   * 点击卡片进入详情
   */
  tocarddetail: function (e) {
     let that=this
      my.navigateTo({
        url: '../mainsucess/mainsucess',
      })
      that.setData({
        items:  e.target.dataset
      });
       // 储存登录数据
      my.setStorageSync({
        key: 'carditem',
        data:that.data.items.value
        //  {
        //   'snumber':that.data.items.card_no,
        //  'childid':that.data.items.child_mid,
        //  'stu_name':that.data.items.stu_name,
        //  'school_name':that.data.items.school_name
        // }
      });
  },
  /**
   * 卡片列表
   */
  card_lists: function (type) {
      var that = this;
      // const data = { 
      //    "mid": this.getstora.data.mid, 
      // };
      // my.httpRequest({
      //   method: 'POST',
      //   url: 'https://api.fangaoykt.100eks.cn/member.bind.cards', 
      //   // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      //   data: {
      //     request: JSON.stringify(data)
      //   },
      //   headers: {
      //     //  'Content-Type': 'application/x-www-form-urlencoded',
      //      "token":this.getstora.data.token,
      //     '2021002116636196':'2019090867080310'
      //   },
      //   dataType: "json",
      //   success: (res) => {
      //   // 授权成功并且服务器端登录成功
      //       if (res.data.code == 0) {
             
      //          if (res.data.data){
      //           that.cardlists = res.data.data
      //           that.setData({
      //             cardlists: res.data.data,
      //           });
      //         }
      //         else{
      //           that.setData({
      //             cardlists: [],
      //             leaveStartShown: true,
      //           });
      //         }
              
      //         } else {
      //             my.showToast({
      //               content: res.data.msg,
      //             });
      //         }
      //   },
      //   fail: (res) => {
      //     // 根据自己的业务场景来进行错误处理
      //     my.showToast({
      //       content: '网络错误,请重试！',
      //     });
      //   },
      // });


      const data = {
        "mid": this.getstora.data.mid
      }

      http.request(api.bindcards, "POST", data, this.getstora.data.token, '', true).then((item) => {
         if (item.data.code == 0) {
             
               if (item.data.data){
                that.cardlists = item.data.data
                that.setData({
                  cardlists: item.data.data,
                });
              }
              else{
                that.setData({
                  cardlists: [],
                  leaveStartShown: true,
                });
              }
              
              } else {
                  my.showToast({
                    content: item.data.msg,
                  });
              }
    })

  },
  // 监听生命周期回调 onShow
  onShow() {
     this.card_lists()
  },
  onUnload: function () {
  //  my.navigateTo({
  //     url: '../cards/cards',
  //   })
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
