// 获取全局 app 实例
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
    pickerVal:'',//获取月份
    arrIndex:'',
    getstora:{},
    carditem:{},
    monthyfirst:''
  },
  // 监听生命周期回调 onLoad
  onLoad() {

    this.getstora = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
   this.carditem = my.getStorageSync({
      key: 'carditem', // 缓存数据的key
    });
   // 获取当前月份的前几个月
   this.month()
  // 获取记录详情
  this.getDetail();
  },
   // 获取当前月份
    month(){
        this.dataArr = [];
        var data = new Date();
        var year = data.getFullYear();
        data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
        for (var i = 0; i < 4; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            var m = data.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            this.dataArr.unshift(data.getFullYear() + "-" + (m))
        }
         this.setData({
          dataArr: this.dataArr,
        })
        
    },
     //激活picker组件
    showmonth(e,value){
        this.popupVisible=true;
        
    },
    bindObjPickerChange(e) {
      const that = this;
     this.setData({
        arrIndex: e.detail.value, 
      });
      for (var i = 0; i < that.dataArr.length; i++) {
       if (i == that.data.arrIndex){
          that.setData({
            monthyfirst: that.dataArr[i]
          })
        }
      }
      console.log('携带值为', that.data.monthyfirst);
       that.getDetail();
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
          'appid':'2019102468629097'
        },
        dataType: "json",
        success: (res) => {
          my.hideLoading();
            if(res.data.code == 0){
                that.detailall=res.data.data.list;//学生详情
               that.setData({ 
                  detailall: res.data.data.list,
                  monthy :res.data.data.month,
                  leaveStartShown: true,
                });
            }
            else {
              my.showToast({
                  content: res.data.msg,
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
