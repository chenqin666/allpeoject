const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')
const app = getApp();

Page({
  data: {
    school_name:'',
    school_id: '',
    jiebangpass:'',//解绑密码
    user:'',
    originHeight: '',
    screenHeight: '',
    isOriginHeight: true,
    cardnumber:'',
    childidnumber:'',
    cardmid:'',
    stunames:'',
    datalist:'',
     totips:false,//弹框
    biyetip: false,//毕业生弹框
    newcode:'',//验证码
    timerNumber: '获取验证码', //短信验证码倒计时
    ts: '',
    isCode: false,
    isClickCode: true,
  },

  onBlur(e) {
    
  },
  timer: function () {
    // this.isClickCode = false;
    // this.isCode = true;
    var self = this;
 
    self.setData({
      timerNumber:60,
      ts: 's',
      isClickCode: false,
      isCode:true,
    })
    var set = setInterval(function () {
      if (self.data.timerNumber == 1) {
        self.setData({
          timerNumber: '获取验证码',
          ts: '',
          isClickCode: true,
        })
        clearInterval(set);
        return false;
      }
      // self.timerNumber--;
      self.setData({
        timerNumber: self.data.timerNumber-=1,
      })
    }, 1000)
    setTimeout(function () {
      // self.isCode = false
      self.setData({
        isCode: false,
      })
    }, 2000);
  },
   jieinput: function (e) {
    this.setData({
      newcode: e.detail.value
    })
  },
  fgyun(){
    wx.navigateTo({
        url: '../hhh/hhh',
      })
  },
  // 使用帮助
  gotohelp() {
    wx.navigateTo({
      url: '../helps/helps',
    })
  },
 
  // 充值
  leftmoney(){
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  // 充值明细
  centermoney() {
    wx.navigateTo({
      url: '../detailrech/detailrech'
    })
  },
  // 订单详情
  dingdetail() {
    wx.navigateTo({
      url: '../dingdetail/dingdetail'
    })
  },
  // 交易明细
   rightmoney(){
    wx.navigateTo({
      url: '../details/details'
    })
  },
  // 卡挂失
  realcard(){
    wx.navigateTo({
      url: '../losscard/losscard'
    })
  },
  // 修改密码
  realpsaaword(){
    wx.navigateTo({
      url: '../changepsd/changepsd'
    })
  },
//  退费
  gorefound() {
    let that=this
    if (that.data.datalist.refund_info.refund_type == 0) {
      this.setData({
        biyetip: !this.biyetip
      });
      // 退回方式
      // wx.navigateTo({
      //   url: '../refund/refund'
      // })
    }
    if (that.data.datalist.refund_info.refund_type == 1) {
      // 等待退费
      wx.navigateTo({
        url: '../waitrefound/waitrefound'
      })
    }
    if (that.data.datalist.refund_info.refund_type == 2) {
      // 已退费
      wx.navigateTo({
        url: '../allrefound/allrefound'
      })
    }
    
  },
    // 验证短信验证码并确定
  tuifeiconfirm() {
   
    var that = this;
    if (!that.data.newcode){
         util.toastTap('请输入验证码');
    		return false;
     }
    const data = {
      "mobile": wx.getStorageSync("carddetail").refund_info.mobile, 
      "action": "refund", 
      "verify_code": that.data.newcode
    }
    http.request(api.verification, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
          // that.register()
          that.setData({
            biyetip: false
          });

         
        if (that.data.datalist.refund_info.refund_type==0){
            // 退回方式
            wx.navigateTo({
              url: '../refund/refund'
            })
        }
      
          
      }
      else {
        util.toastTap(result.msg);
      }

    })
  },
  
  // 退费取消
  tuifeicancel() {
    this.setData({
      biyetip: false
    });
  },
  // 获取验证码
  getMsgCode(){
    var that = this;
    if (that.data.isClickCode == false) {
      return;
    }
    // 倒计时
    // that.timer();
    const data = {
      "action": "refund", 
      "mobile": wx.getStorageSync("carddetail").refund_info.mobile
    }
    http.request(api.sendsms, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        
        util.toastTap('验证码已发送');
        that.timer();
        
      }
      else {
        util.toastTap(result.msg);
      }
      
    })
  },
  // 解绑一卡通
  untrying(){
    this.setData({
        totips: !this.totips
      });
  },
   // 解绑一卡通取消
  cancel(){
    this.setData({
        totips: false
      });
  },
  // 确定弹框
    confirmpsd(){
      var that=this;
      // if(!that.data.jiebangpass){
      //      util.toastTap('请输入密码');
			// 		return false;
      //  }
      const data = {
        "mid": wx.getStorageSync("mid"),
        "stu_name": wx.getStorageSync("stu_name"),
        "card_num": wx.getStorageSync("snumber")
      }
      http.request(api.unbind, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
        if (result.code == 0) {
          wx.redirectTo({
            url: '../cards/cards'
          })
          util.toastTap(result.msg);
          that.setData({
            totips: false
          });
          // debugger
        }
        else {
          util.toastTap(result.msg);
        }
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
    },
  // 余款查询
  search(){
      wx.navigateTo({
        url: '../searchall/searchall'
      })
  },
  carddetails(){
    var that = this;
    const data = {
      "mid": wx.getStorageSync("mid"),
      "stu_name": wx.getStorageSync("stu_name"),
      "card_num": wx.getStorageSync("snumber")
    }
    http.request(api.detail, data, wx.getStorageSync("token"), '', '', true).then(function (result) {
      if (result.code == 0) {
        // util.toastTap(result.msg);
        wx.setStorageSync('carddetail', result.data)
        that.setData({
          datalist: result.data,
          school_id: wx.setStorageSync('school_id', result.data.school_id)
        });
      }
      else {
        util.toastTap(result.msg);
      }
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu({

    });
    this.setData({
      school_name: wx.getStorageSync("school_name"),
      snumber: wx.getStorageSync("snumber"),
      // newmobil: wx.getStorageSync("carddetail").refund_info
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
    // 卡片详情
    this.carddetails()
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
});
