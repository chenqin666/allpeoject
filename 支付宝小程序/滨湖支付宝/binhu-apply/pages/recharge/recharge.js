// 获取全局 app 实例
const app = getApp();

Page({
  // 声明页面数据
  data: {
   cardnumber:'',
   modalOpened2: false,
    stunames:'',
    tohref:'',
    cardmid:'',
    moneys:'',
    getstora:{},
    getstoraone:{},
    schoolid:{},
    cardlists:[],
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
    var that=this;
   
   that.getstora = my.getStorageSync({
      key: 'carditem', // 缓存数据的key
    });
   
     that.getstoraone = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
    that.schoolid = my.getStorageSync({
      key: 'schoolid',
    });
   // 卡片信息
   that.setData({
      cardnumber: that.getstora.data.card_no,
      childid: that.getstora.data.child_mid,
      stunames: that.getstora.data.stu_name,
      mid: that.getstoraone.data.mid,
    })
    
  },
  // 监听生命周期回调 onShow
  onShow() {
   
  },
  
  /**
   *  点击item
   */
  onTypeClick(event) {
    // debugger
    var id = event.target.dataset.userName;
    this.setData({
      moneys: id,
    });
  },
 /*支付宝支付*/
    go2recharge: function (){
       var that=this;
         if (that.data.moneys == '') {
            my.showToast({
              type: 'error',
              content: '请选择金额',
              duration: 1500
            });
            return false;
          } 
      
    const data = { 
       "mid": that.getstoraone.data.mid,
        "card_num": that.getstora.data.card_no,
        "stu_name": that.getstora.data.stu_name,
        "fee": that.data.moneys,
        "pay_type":'alipayH5' 
    };
  my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/cashier.execute.payment', 
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
             // location.href = res.data.data//支付宝跳转链接
                my.ap.navigateToAlipayPage({ 
                  path:res.data.data,
                  success:(res) => {
                     
                  },
                  fail:(error) => {
                              
                  }
                })
            }
            else {
               my.showToast({
                content: res.data.msg,
              });
          }
        },
        fail: (res) => {
           my.showToast({
            content: '网络错误,请重试！',
          });
        },
      });
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
