// pages/my/setting/setting.js
const util = require('../../../utils/util.js');
const http = require('../../../utils/http.js');
const api = require('../../../utils/api.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    imageArray:'',
    loginsrc:'',
    a: true,
    time: "",
    mobile: "",
    hidden: true,
    btn_src: "../../../images/adds.png",
    files: ["../../../images/adds.png"],
  },
  
  /**
     * 点击图片
     */
  // onItemClick: function (event) {
   
  //   var url = event.currentTarget.dataset.url;
  //   if (url == this.data.btn_src) { //上传图片
  //     this.chooseImage();
  //   }
  // },


  /**
   * 选择图片
   */
  chooseImage: function () {
    const that = this;
    var currenFiles = this.data.files;

    my.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths);
        that.setData({
          files: res.tempFilePaths,
        })
        // this.upload(0);
        that.sub()
      }
    })
  },

  /**
    * 提交
    */
  sub: function () {
    let that = this
    if (this.data.files && this.data.files.length > 0) {
      that.setData({
        imageArray: '',
      })
      that.upload(0);
    } 
  },

  /**
   * 上传图片
   */
  upload: function (index) {
    let that=this
    var paths = this.data.files;
  
    var uploadurl = http.API_URL + api.teacheruploadexecuteupload;
    if (index < paths.length) {
      const that = this;
      my.uploadFile({
        url: uploadurl,
        filePath: paths[index],
        name: 'file',
        header: {
          "token": my.getStorageSync("token"),
          'content-type': 'application/json', // 默认值
        },
        // formData: {
        //   'user': encodeURL('test')
        // },
        success: function (res) {
          var respData = JSON.parse(res.data);
          that.setData({
            imageArray: respData.data,
            // loginsrc: respData.data,
            a:false
          })
          app.globalData.myimageArray = that.data.imageArray
          // my.setStorageSync("logininfo").teacher_face_photo = that.data.imageArray
          console.log('123' + respData.data)
          
          // that.upload(index + 1);
        },
        fail: function (res) {
          console.log('456' + res)
        }

      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.setData({
      loginsrc: my.getStorageSync("logininfo").teacher_face_photo ? my.getStorageSync("logininfo").teacher_face_photo:'',
      a: my.getStorageSync("logininfo").teacher_face_photo!=''?false:true
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      loginsrc: my.getStorageSync("logininfo").teacher_face_photo ? my.getStorageSync("logininfo").teacher_face_photo:'',
      a: my.getStorageSync("logininfo").teacher_face_photo != '' ? false : true
    })
    if (app.globalData.myimageArray){
      this.setData({
        btn_src: app.globalData.myimageArray,
        a: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

 /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: '/pages/index/index',

      success: function (res) {
        // 转发成功
        my.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }
  },
})