// 获取全局 app 实例
const app = getApp();

var phoneType = {}
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
  // 卡号查询
  cardsearch() {
    my.navigateTo({
      url: '../cardsearch/cardsearch',
    })
  },
  // 操作说明
  toimage() {
    my.navigateTo({
      url: '../images/images',
    })
  },
  // 绑定一卡通
  bindcard() {
      my.navigateTo({
      url: '../login/login',
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
      const data = { 
         "mid": this.getstora.data.mid, 
      };
      my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/member.bind.cards', 
        // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
        data: {
          request: JSON.stringify(data)
        },
        headers: {
          //  'Content-Type': 'application/x-www-form-urlencoded',
           "token":this.getstora.data.token,
          'appid':'2021001191661835'
        },
        dataType: "json",
        success: (res) => {
         
        // 授权成功并且服务器端登录成功
            if (res.data.code == 0) {
              // that.cardlists = res.data.data
              // that.setData({
              //   cardlists: res.data.data,
              //   leaveStartShown: true,
              // });
              
               if (res.data.data){
                that.cardlists = res.data.data
                that.setData({
                  cardlists: res.data.data,
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
                    content: res.data.msg,
                  });
              }
              if(res.status!=200){
                  that.problemDetection(data,res)
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
  /**
   * 检测问题
   */
  problemDetection: function (request,res) {
      var that = this;
      my.httpRequest({
        method: 'POST',
        url: 'https://home.fangaoyun.com/api/failed', 
        // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
        data: {
           "appid": 'fa3a4aa05248df35',
          "uri": 'https://api.fangaoykt.100eks.cn/member.bind.cards',
          "request": JSON.stringify(request),
          "response": JSON.stringify({}),
          "device_info": JSON.stringify(that.data.phoneType),
          "status_code":res.status
        },
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
          
        },
        dataType: "json",
        success: (res) => {
        // 授权成功并且服务器端登录成功
            if (res.data.code == 0) {
             
              
              } else {
                 
              }
        },
        fail: (res) => {
          
        },
      });
  },

  // 监听生命周期回调 onShow
  onShow() {
     this.card_lists()
      var that = this;
      // 设备信息     
      my.getSystemInfo({
          success(res) {           
            that.setData({
              phoneType: res
            })
            console.log( that.data)
            console.log(that.data.phoneType)
          }
      })

     
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
