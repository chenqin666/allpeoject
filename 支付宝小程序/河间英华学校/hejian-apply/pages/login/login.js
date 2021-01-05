// pages/login/login.js
const util = require('../../utils/util.js');

const app = getApp()
var phoneType = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isdis:false,
    mobile: '',
    name: '',
    password:'',
    action: 'mplogin',//默认为绑定使用mplogin，失效登录使用login
    msg: '获取验证码',
    flag: 0,
    auth_code: '',
    uid: '',
    getstora:{},
    focus: true,
    company_id: ''

  },
  onFocus() {
    this.setData({
      focus: false,
    });
  },
  onBlur() {
    this.setData({
      focus: true,
    });
  },
  mobileinput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeinput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
    // 卡号查询
  cardsearch() {
    my.navigateTo({
      url: '../cardsearch/cardsearch',
    })
  },
passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },


fgyun(){
    my.navigateTo({
        url: '../hhh/hhh',
      })
},

/**
   * 登录
   */
  go2login: function () {
    const that = this;
    if (that.Trim(that.data.mobile)== '') {
      my.showToast({
        content: '请输入工号/学号',
      });
      return false;
    }
    
    if (that.Trim(that.data.name) == '') {
      my.showToast({
        content: '请输入姓名',
      });
      return false;
    } 
    // if (that.Trim(that.data.password) == '') {
    //   my.showToast({
    //     content: '请输入一卡通密码',
    //   });
    //   return false;
    // } 
    that.setData({
          isdis:true
    });
    const data = { 
       "mid": that.getstora.data.mid, 
      "card_num": that.data.mobile,
      "stu_name":that.data.name,
      "password":'000000'
      // that.data.password
    };
      my.httpRequest({
        method: 'POST',
        url: 'https://api.fangaoykt.100eks.cn/member.binding.cards', 
        data: {
          request: JSON.stringify(data)
        },
        headers: {
          "token":this.getstora.data.token,
           'appid':'2021001193630999'
        },
        dataType: "json",
        success: (res) => {
            if (res.data.code == 0) {
              that.setData({
                    isdis:false
              });
              my.showToast({
                content: res.data.msg,
              });
               // 储存登录数据
              my.setStorageSync({
                key: 'loginstwo',
                data: {
                  mobile: that.data.mobile,
                  name:that.data.name,
                  // password:that.data.password
                }
              });
              my.navigateTo({
                url: '../cards/cards',
              })
          }
            else {
              my.showToast({
                content: res.data.msg,
              });
               that.setData({
                    isdis:false
              });
          }
          if(res.status!=200){
                  that.problemDetection(data,res)
              }
        },
        fail: (res) => {
          // 根据自己的业务场景来进行错误处理
          my.showToast({
            content: res.data.msg,
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
           "appid": '57df13bb7ac8d0fd',
          "uri": 'https://api.fangaoykt.100eks.cn/member.binding.cards',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getstora = my.getStorageSync({
      key: 'loginsone', // 缓存数据的key
    });
    if (options.tokenlost){
      setTimeout(function () {
        util.toastTap("账号登录失效，请重新登录");
      }, 1800) //延迟
    }

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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})