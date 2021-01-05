// 获取全局 app 实例
const app = getApp();

Page({
  // 声明页面数据
  data: {
    consume_list: [
            {
                "m": "11月",
                "list": [
                    {
                        "id": 24,
                        "pay_amount": "0.25",
                        "to": "186****3513",
                        "duration": 1,
                        "create_time": "2020-11-30 16:58:11"
                    },
                    {
                        "id": 23,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-30 16:41:00"
                    },
                    {
                        "id": 22,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-27 15:53:59"
                    },
                       {
                        "id": 24,
                        "pay_amount": "0.25",
                        "to": "186****3513",
                        "duration": 1,
                        "create_time": "2020-11-30 16:58:11"
                    },
                    {
                        "id": 23,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-30 16:41:00"
                    },
                    {
                        "id": 22,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-27 15:53:59"
                    },
                       {
                        "id": 24,
                        "pay_amount": "0.25",
                        "to": "186****3513",
                        "duration": 1,
                        "create_time": "2020-11-30 16:58:11"
                    },
                    {
                        "id": 23,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-30 16:41:00"
                    },
                    {
                        "id": 22,
                        "pay_amount": "0.25",
                        "to": "181****3727",
                        "duration": 1,
                        "create_time": "2020-11-27 15:53:59"
                    },
                
                    ]
                  }
                ],
    student_id: '',
    pageShow: false,
    page: 1,
    pageSize: 8,
    total: null,
    loding: '',
    lodingShow: false,
    dataArr:[],
    pickerVal:'',//获取月份
    arrIndex:'',
    monthy:'',
    monthyfirst:''
  },
  // 监听生命周期回调 onLoad
  onLoad() {

  //   this.getstora = my.getStorageSync({
  //     key: 'loginsone', // 缓存数据的key
  //   });
  //  this.carditem = my.getStorageSync({
  //     key: 'carditem', // 缓存数据的key
  //   });
  
  // // 获取记录详情
  // this.getDetail();
  },

  
     // 获取记录详情
    getDetail: function () {
       var that=this;
    const data = { 
      "mid": that.getstora.data.mid,
      "card_num": that.carditem.data.card_no,
      "date": that.data.monthyfirst
    };

     my.showLoading({
      title: '加载中',
    })
    
     my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/member.card.consume', 
        data: {
          request: JSON.stringify(data)
        },
        headers: {
          //  'Content-Type': 'application/x-www-form-urlencoded',
           "token":that.getstora.data.token,
          '2021002116636196':'2019090867080310'
        },
        dataType: "json",
        success: (res) => {
          my.hideLoading();
            if(res.data.code == 0){
                that.consume_list=res.data.data.list;//学生详情
               that.setData({ 
                  consume_list: res.data.data.list,
                  monthy :res.data.data.month,
                  total: Math.ceil(item.data.total/_this.data.pageSize),
          pageShow: true
                });
            }
            else {
              my.showToast({
                  content: res.data.msg,
                  pageShow: false
                });
          }
        },
        fail: (res) => {
          // 根据自己的业务场景来进行错误处理
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
