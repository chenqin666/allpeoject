// pages/parenthome/bindchild/searchcode/searchcode.js
// pages/parenthome/bindchild/bindchild.js
const util = require('../../../../utils/util.js');
const http = require('../../../../utils/http.js');
const api = require('../../../../utils/api.js')

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showstulist:false,
    stulists:'', 
    name: '',
    code: '',
    mid: '',
    token: '',
    school: '',
    // class_name:'',

    gradeshown:false,
    gradearray:[],
    gradeIndex:0,
  },

  /**
   * 姓名
   */
  inputname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  /**
    *  跳转到选择学校
    */
  onselectschool: function () {
    var targeturl = this.data.school ? ("../schoollist/schoollist?schoolid=" + this.data.school.school_id) : "../schoollist/schoollist"

    my.navigateTo({
      url: targeturl,
    })
  },

  /**
    *  选择年级
    */
  onpickgrade:function(e){
  
  
      this.setData({
        gradeIndex: e.detail.value,
        gradeshown:true,
      });

    console.log(this.data.gradeIndex);
    console.log(this.data.gradeshown);
  },

 /**
   * 班级
   */
  // inputclass: function (e) {
  //   this.setData({
  //     class_name: e.detail.value
  //   })
  // },


  /**
   * 查询学生编号
   */
  searchcode: function () {
   
    if (this.data.school == '') {
      util.toastTap("请选择学校");
      return;
    }

    if (this.data.name.trim() == '') {
      util.toastTap("请输入学生姓名");
      return;
    }

    if (this.data.gradeshown == false) {
      util.toastTap("请选择班级");
      return;
    }

    // if (this.data.class_name == "") {
    //   util.toastTap("请输入班级");
    //   return;
    // }
  
    const that = this;

    const data = {
      "school_id": this.data.school.school_id,
      "grade_name": this.data.gradearray[this.data.gradeIndex],
      // "class_name": this.data.class_name,
      "student_name": this.data.name,
    }
   
    http.request(api.childcardsearch, data, this.data.token, ).then(function (result) {
      // let a = result.code
      // debugger
      if (result.code == 0) {
        if (result.data) {
          that.setData({
              showstulist: true,
              stulists: result.data
            })
            // my.showModal({
            //   title: '查询结果',
            //   content: "学生编号为：" +  result.data.card_number,
            //   showCancel: false,
            //   confirmText: "复制",
            //   confirmColor: "#2ab1f3",
            //   success: function (res) {
            //     if (res.confirm) {
            //       //复制成功，返回上一页
            //       app.globalData.card_number = result.data.card_number;
            //       my.navigateBack({
            //         delta: 1
            //       });
            //     }
            //   }
            // })
      
        }
         else {
          // util.toastTap("未找到该学生的编号信息"); 
          that.setData({
            showstulist: false
          })       
          my.showModal({
            title: '查询结果',
            content: result.msg,
            showCancel: false,
            confirmText: "确定",
            confirmColor: "#2ab1f3",
            complete: function (res) {

            }
          })
        }
      }
      else if (result.code == 5000){
        that.setData({
          showstulist: false
        }) 
        my.showModal({
          title: '查询结果',
          content: result.msg,
          // '该班级有重名的学生，需您和孩子联系获取学生编号。',
          showCancel: false,
          confirmText: "确定",
          confirmColor: "#2ab1f3",
          complete: function (res) {
            
          }
        })
      }
      
      else{
        util.toastTap(result.msg);
      }

    })

  },
  // 复制
  callnumber: function (e) {
    const that = this;
    my.setClipboardData({
      data: e.currentTarget.dataset.data,
      success: function (res) {
        util.toastTap("复制成功");
        //复制成功，返回上一页
        app.globalData.card_number = e.currentTarget.dataset.data;
        my.navigateBack({
          delta: 1
        });
      }
    })

  },

  /**
   *  获取学校列表
   */
  getSchoolList: function () {
    const that = this;
    const data = {
      "mid": this.data.mid,
    }
    http.request(api.schoollistquery, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        if (result.data.length == 1) {
          var arrayNew=[];
          for (var i = 0; i < result.data[0].grade_list.length;i++){
            arrayNew.push(result.data[0].grade_list[i].grade_name);
          }
          that.setData({
            school: result.data[0],
            gradearray: arrayNew,
            gradeshown: false,
            gradeIndex: 0,
          });
        }

      }
    })
  },


 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // my.hideShareMenu({

    // });
    var muid = my.getStorageSync("uid");
    var mtoken = my.getStorageSync("token");
    this.setData({
      mid: muid,
      token: mtoken,
    })

    this.getSchoolList();
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
    if (app.globalData.school) {
      if (this.data.school && app.globalData.school.school_id == this.data.school.school_id){//选择的是一个学校，不处理
        
      }else{
        var arrayNew = [];
        for (var i = 0; i < app.globalData.school.grade_list.length; i++) {
          arrayNew.push(app.globalData.school.grade_list[i].grade_name);
        }
        this.setData({
          school: app.globalData.school,
          gradearray: arrayNew,
          gradeshown: false,
          gradeIndex: 0,
        });
      }
      app.globalData.school = '';
    }

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
  }
})