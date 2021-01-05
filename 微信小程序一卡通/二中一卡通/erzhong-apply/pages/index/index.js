//index.js
//获取应用实例
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

//获取应用实例
const app = getApp()

Page({
  data: {
   motto: 'Hello World',
    ishidden: true,
    userInfo: {},
    hasUserInfo: false,
    isconfirm: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isrequesting: false,
    list:'',
    fileDataDir: wx.env.USER_DATA_PATH + "/f1.txt",
  },
  onLoad: function (options) {
    // this.checkupdate();
    // 检测是否通过学校一卡通充值入口进入
    let that=this
   console.log(options.appid)
   
    app.globalData.apiAppid = options.appid
    that.setData({
      list: options.appid
    })
    if (options.appid != '' || options.appid != undefined){
      wx.setStorageSync('apiAppid', options.appid)
    }
 
    // 第一次有和无
    
    if (options.appid != undefined){
    //  将appid写入文件
      wx.getFileSystemManager().writeFileSync(
         that.data.fileDataDir,
         options.appid,
         "utf8",
      
      );
    }
    else{
   
      var isDirTrue = false;
      try{
        if (wx.getFileSystemManager().accessSync(wx.env.USER_DATA_PATH + "/f1.txt") == undefined){
          isDirTrue = true;
          }
      }catch(e){
        console.log(e);
      }
      if (isDirTrue){
       
        var newlist = wx.getFileSystemManager().readFileSync( //读取文件apid
          wx.env.USER_DATA_PATH + "/f1.txt",
          'utf-8',
          
        )
        that.setData({
          list: newlist
        })
        console.log(that.data.list)
      }
     
    }
    that.entrance()
    
    
   
  },

  onShow: function () {
    
    
    // var iscoolstart= wx.getStorageSync("iscoolstart");
    // if (!iscoolstart || iscoolstart==true){
      // this.checkupdate();
    // }else{
    //   this.onloadevent();
    // }

  },
  // 检测是否通过学校一卡通充值入口进入
  entrance() {
    const that = this;
    const data = {};
    http.request(api.entrance, data, '', '', true).then(function (item) {
      if (item.code == 0) { 
    console.log(that.data.list)
        if (that.data.list == undefined) {       
          if (item.data == 1) {
            wx.showToast({
              title: '请通过学校一卡通充值入口进入',
              icon: "none",
              duration: 9500
            })
            return false;
          }
          if (item.data == 0) {
            wx.setStorageSync('apiAppid', 'wxa2469364bb9be9bd');
            wx.getFileSystemManager().writeFileSync(
              that.data.fileDataDir,
              'wxa2469364bb9be9bd',
              "utf8",

            );
           
            that.isopen();
          }

        }
        else {
          
          that.isopen();
        }

      } else {
        util.toastTap(item.msg);
      }
    });
  },
  // 检测学校是否开启
isopen(){
  const that = this;
  const data = {};
  http.request(api.isopen, data, '', '', true).then(function (item) {
   if (item.code == 0) {
   
     if (item.data.server_status=='ON'){
       that.checkupdate();
       console.log('556622')
     }
     else{
       that.setData({
        isconfirm: true
       })
      
     }

    }else {
      util.toastTap(item.msg);
    }
  });
},
  onloadevent: function () {

    const that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("wx.getSetting success  scope.userInfo");
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.init();
          
        } else {
          console.log("ishidden  false");

          that.setData({
            ishidden: false,
          })
        }
      },
      fail: function (res) {
        console.log("ishidden  false");
        that.setData({
          ishidden: false,
        })
      }
    })
  },
  checkupdate: function () {
    const that = this;
    // 获取小程序更新机制兼容
    // debugger
    if (wx.canIUse('getUpdateManager')) {
      console.log('1111111')
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('222222')
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('333333')
          updateManager.onUpdateReady(function () {
            console.log('4444444')
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，请点击确定按钮进行更新',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('66666')
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              showCancel: false,
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        } else {

          console.log('55555')
          that.onloadevent();
        }
      })
    } 
   
    else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    this.inittimeout();

  },


  inittimeout: function () {
    const that = this;
    setTimeout(function () {
      that.setData({
        ishidden: false,
      })
    }, 8 * 1000);
  },


  init: function () {
    const that = this;
    if (app.globalData.userInfo) {
      console.log("init1");
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
      this.times();

    } else if (this.data.canIUse) {
      console.log("userInfoReadyCallback")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo,
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,

          })
        that.times();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("在没有 open-type=getUserInfo 版本的兼容处理")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,

          })
          that.times();
        },

        fail: function (res) {
          console.log("ishidden  false");
          that.setData({
            ishidden: false,
          })
        }
      })
    }
  },




  getUserInfo: function (e) {
    
    const that = this;

    if (e.detail.errMsg == "getUserInfo:fail auth deny" || e.detail.errMsg == "getUserInfo:fail auth cancel") {
      // wx.navigateBack({

      // })
      // util.toastTap("登录失败，点击进入云校园按钮重试");
      this.setData({
        ishidden: false,
      })
      wx.showModal({
        title: '用户未授权',
        content: '您已经拒绝了授权，如需正常使用一卡通功能，请在授权提示中选择“允许”',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
           
          }
        }
      })
      return;
    }


    app.globalData.userInfo = e.detail.userInfo;
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,

    })
    this.times();
  },


  /**
   * 2s倒计时
   */
  times: function () {
    const that = this;
   
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("code==" + res.code)
          const data = {
            "code": res.code,
            "userInfo": app.globalData.userInfo,
          };
          if (that.data.isrequesting == true) {
            return;
          }

          that.setData({
            isrequesting: true
          });
          wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
          http.request(api.wxlogin, data,'', '',  true).then(function (item) {
            console.log("result==" + item)
            if (item.code == 0) {
              wx.hideLoading();
              console.log('2233')
              console.log(item.data.o)
              wx.setStorageSync('logininfo', item.data)
              wx.setStorageSync('mid', item.data.mid); //保存uid
              wx.setStorageSync('token', item.data.token)
               wx.redirectTo({
                url: '../cards/cards',
              })

            } else if (item.code == 2002) { //首次进入没有鉴权，先去接口取回openid和unionid
              wx.hideLoading();
              that.setData({
                isrequesting: false,
              });


              wx.setStorageSync('openid', item.data.openid); //保存openid
              wx.setStorageSync("unionid", item.data.unionid); //保存unionid
              wx.setStorageSync("member_type", "3"); //保存unionid
              // wx.redirectTo({
              //   url: '../login/login',
              // })
            } else {
              wx.hideLoading();
              that.setData({
                isrequesting: false,
              });

              console.log("here"),
                that.setData({
                  ishidden: false,
                })
            }
          });
        } else {
          this.setData({
            isrequesting: false,
          });

          console.log('登录失败！' + res.errMsg)
          // util.toastTap("登录失败，点击进入云校园按钮重试");
          that.setData({
            ishidden: false,
          })

        }
      },

      fail: function (res) {

        console.log("ishidden  false");
        that.setData({
          isrequesting: false,
        });

        that.setData({
          ishidden: false,
        })
      }

    });

    this.inittimeout();
  },
})
