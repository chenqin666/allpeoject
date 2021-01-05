// pages/login/login.js
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisWidth:'',
    thisheight:'',
    imgbase64Url:'',
    imgurl:'',
    disableScroll: true,
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    complete: false,
    loadsucess:false,
    takePhotocount:1,
  },
  /**
   * 去空格
   */
  Trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  takePhoto() {
    console.log('4444444')
    var ctx = wx.createCameraContext()
    var that = this
      //拍摄照片
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        
        that.setData({
          imgurl: res.tempImagePath//展示校区
        })       
        that.upload(res.tempImagePath)  
      },
      error:(res)=>{
          console.log('101010101010'+res)
      },
    })  
  },
  /**
   * 上传图片到服务器
   */
  upload: function (index) {
    var uploadurl = http.API_URL + api.uploadeimg;
      const that = this;
      const data = {
        password: index
      }
      wx.uploadFile({
        url: uploadurl,
        filePath: index,
        name: 'file',
        header: {
          'content-type': 'application/json', // 默认值
        },
        formData: {
          'user': 'test'
        },
        success: function (res) {
          console.log(JSON.parse(res.data).data[0]);
          var respData = JSON.parse(res.data).data[0];
          // 识别成功之后跳转
         
          wx.setStorageSync('tempFilePaths', respData)
          // 用http的图片获取信息
          that.uploadImg(respData)
        }
      })

  },
  error(e) {
    console.log(e.detail)
  },
  startdrawCanvas() {
    this.takePhoto();
    console.log('相机初始化成功')
  },

  uploadImg(url) {
    // 调取一次接口takePhotocount+1
    this.setData({
      takePhotocount: this.data.takePhotocount + 1
    })
    console.log(this.data.takePhotocount)
    var that = this;
    const data = {
      "image_url": url
    }
    http.request(api.search, data, wx.getStorageSync("token"), '', true).then(function (res) {
    if (res.errCode == 0) {
      wx.setStorageSync('searchData', res.data)
      
      if (res.data){
        clearInterval(null)
        console.log('hahahaha')
          wx.navigateTo({
            url: '../details/details'
          })
       
       }
      
    }
    else if (res.errCode == 3001) {
      that.goBack('image_url不能为空，请重新录入！')
      wx.setStorageSync('errMsg', res.errMsg)
      wx.setStorageSync('searchData', '')
    }
    else if (res.errCode == 4004) {
      that.goBack('用户不存在，请重新录入！')
      wx.setStorageSync('errMsg', res.errMsg)
      wx.setStorageSync('searchData', '')
    } 
     else {
      that.goBack('网络错误，请重新录入！')
      wx.setStorageSync('errMsg', '未检测到人脸，请重新录入！')
      wx.setStorageSync('searchData', '')
    }
    })
  },
  goBack(info) {
    if (this.data.takePhotocount <=10) {
      setTimeout(() => {
        this.takePhoto()
      }, 2000)
    }
    else{
      this.setData({
        takePhotocount:1
      })
      console.log('xixixixix')
      wx.navigateTo({
        url: '../details/details'
      })
    }
    
 
  },
  drawProgressbg: function () {
    let that=this
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(5); // 设置圆环的宽度
    ctx.setStrokeStyle('#C5ECFF'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(this.data.thisWidth / 2, this.data.thisheight / 2, (this.data.thisWidth / 2)-3, 0, Math.PI * 2, false);
    
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
   
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#2AB1F3");
    gradient.addColorStop("0.5", "#2AB1F3");
    gradient.addColorStop("1.0", "#2AB1F3");
    context.setLineWidth(5);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(this.data.thisWidth / 2, this.data.thisheight / 2, (this.data.thisWidth / 2) - 3, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
  },
  countInterval: function () {
    let that=this
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (that.data.count <= 200) {
        /* 绘制彩色圆环进度条
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        that.drawCircle(that.data.count / (200 / 2))
        that.data.count++;
        that.setData({
          count: that.data.count++
        });
        
      } else {
        that.setData({
          complete: true
        });
        clearInterval(that.countTimer);
      }
    }, 100)

      
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  获取画布的宽高画圆
    //  调取画圆的方法
    let that=this
    that.setData({
      count: 0,
      takePhotocount: 1,
    })
    const query = wx.createSelectorQuery().in(this)
    query.select('.progress_bg').boundingClientRect((rect) => {
      that.setData({
        thisheight: rect.height,
        thisWidth:rect.width
      })
      var ctx = wx.createCanvasContext('canvasProgressbg')
      ctx.setStrokeStyle('#C5ECFF');
      if (wx.createCameraContext()) {
        console.log('777777777777777777777777777')
        that.cameraContext = wx.createCameraContext('myCamera')
        that.drawProgressbg();
        that.countInterval();
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }

    }).exec()



  },
  touchmove(event){
    // debugger
    // event.preventDefault()
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