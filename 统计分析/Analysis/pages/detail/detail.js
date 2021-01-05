// pages/detail/detail.js
const util = require('../../utils/util.js');
const http = require('../../utils/http.js');
const api = require('../../utils/api.js')


const wxCharts = require('../../utils/wxcharts.js');

const app = getApp()

var columnChart = null;
var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015']
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
};



Page({

  /**
   * 页面的初始数据
   */
  data: {

    // tab标识
    class_tab_id:0,
    date_tab_id:0,
    type_tab_id:0,

    school_id:'',

    start_date:'',
    end_date:'',


    infodetail:'',
    todaydetail:'',
    chartdetail:'',



  // 图表
    chartTitle: '总成交量',
    isMainChartDisplay: true,
  },


  // backToMainChart: function () {
  //   this.setData({
  //     chartTitle: chartData.main.title,
  //     isMainChartDisplay: true
  //   });
  //   columnChart.updateData({
  //     categories: chartData.main.categories,
  //     series: [{
  //       name: '成交量',
  //       data: chartData.main.data,
  //       format: function (val, name) {
  //         return val.toFixed(2) + '万';
  //       }
  //     }]
  //   });
  // },
  touchHandler: function (e) {
    util.toastTap("待开发");
    // var index = columnChart.getCurrentDataIndex(e);
    // if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
    //   this.setData({
    //     chartTitle: chartData.sub[index].title,
    //     isMainChartDisplay: false
    //   });
    //   columnChart.updateData({
    //     categories: chartData.sub[index].categories,
    //     series: [{
    //       name: '成交量',
    //       data: chartData.sub[index].data,
    //       format: function (val, name) {
    //         return val.toFixed(2) + '万';
    //       }
    //     }]
    //   });

    // }
  },





  /**
   * 详情
   */
  onclickdetail: function (e) {
      var  grade_id="";
    var grade_name='';

    if (this.data.class_tab_id == 0 ){
      grade_id = this.data.infodetail.grade_list[0].grade_id;
      grade_name = this.data.infodetail.grade_list[0].grade_name;
      
    }else if (this.data.class_tab_id == this.data.infodetail.grade_list[0].grade_id){
      grade_id = this.data.infodetail.grade_list[0].grade_id;
      grade_name = this.data.infodetail.grade_list[0].grade_name;
    } else if (this.data.class_tab_id == this.data.infodetail.grade_list[1].grade_id){
      grade_id = this.data.infodetail.grade_list[1].grade_id;
      grade_name = this.data.infodetail.grade_list[1].grade_name;
    } else if (this.data.class_tab_id == this.data.infodetail.grade_list[2].grade_id) {
      grade_id = this.data.infodetail.grade_list[2].grade_id;
      grade_name = this.data.infodetail.grade_list[2].grade_name;
    }
    var grade_list = JSON.stringify(this.data.infodetail.grade_list);
  
   wx.navigateTo({
     url: '../classdetail/classdetail?school_id=' + this.data.school_id + "&grade_id=" + grade_id + "&grade_name=" + grade_name + "&grade_list=" + grade_list,
   })
  },


  onclicktodayinfo: function (event) {
   var newtype= event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../todayclasslist/todayclasslist?school_id=' + this.data.school_id + "&grade_id=" + "" + "&newtype=" + newtype,
    })
  },



  /**
   * 切换年级
   */
  onclassclick:function(e){
      this.setData({
        class_tab_id:e.currentTarget.dataset.id,
      })

    this.getInfo();
  },
/**
 * 切换类型
 */
  ontypeclick: function (e) {
    console.log(e);
    this.setData({
      type_tab_id: e.currentTarget.dataset.id,
    })
    this.updateChartData();
  },

/**
 * 切换日期
 */
ondateclick:function(e){
  if (this.data.date_tab_id == e.currentTarget.dataset.id ){//点击同一个tab
    if (this.data.date_tab_id == 2){//选择日期
      wx.navigateTo({
        url: '../dateselect/dateselect',
      })
    }
    return;
  }

  if (e.currentTarget.dataset.id==2){//自定义日期
    if (!this.data.start_date || !this.data.end_date) {
      wx.navigateTo({
        url: '../dateselect/dateselect',
      })
    }else{

      this.setData({
        date_tab_id: e.currentTarget.dataset.id,
      })
      this.getchartInfo();
    }
  }else{

    this.setData({
      date_tab_id: e.currentTarget.dataset.id,
    })
    this.getchartInfo();
  }
 

  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    var muid = wx.getStorageSync("uid");
    var mtoken = wx.getStorageSync("token");
    var logindata = wx.getStorageSync("logininfo");

    this.setData({
      mid: muid,
      token: mtoken,
      logininfo: logindata,
      school_id: options.school_id,
    })


    this.getInfo();
    this.getTodayInfo();
    this.getchartInfo();


  },
  /**
   * 获取统计信息
   */
  getInfo: function () {
  
    const that = this;
    var data = {
      "uid": this.data.mid,
      "school_id": this.data.school_id,
      "grade_id": this.data.class_tab_id,
    }


    http.request(api.schoolexecutedetail, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        that.setData({
          infodetail:result.data,
        })

      }
    })

  },

  /**
     * 获取统计信息
     */
  getTodayInfo: function () {
    const that = this;
    var data = {
      "uid": this.data.mid,
      "school_id": this.data.school_id,
      "grade_id": this.data.class_tab_id,
    }

    http.request(api.schoolexecuteone, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        that.setData({
          todaydetail: result.data,
          
        })
      }
    })

  },

  

/**
 * 获取图表信息
 */
  getchartInfo: function (){
        // { "uid": 1, "school_id": 1, "date_type": "yesterday" }
    // date_type: today 今日 yesterday 昨日 other 其他
    // 其他时，需要传递
    // start_date
    // end_date



    const that = this;
    var data = {
      "uid": this.data.mid,
    }

    if (this.data.date_tab_id ==0){
      data = {
        "uid": this.data.mid,
        "school_id": this.data.school_id,
        "date_type": "today",
      }
    } else if (this.data.date_tab_id == 1) {
      data = {
        "uid": this.data.mid,
        "school_id": this.data.school_id,
        "date_type": "yesterday",
      }
    } else if (this.data.date_tab_id == 2) {

      data = {
        "uid": this.data.mid,
        "school_id": this.data.school_id,
        "date_type": "other",
        "start_date": this.data.start_date,
        "end_date": this.data.end_date,
      }
    }  


  
    http.request(api.schoolanalysischart, data, this.data.token, ).then(function (result) {
      if (result.code == 0) {
        that.setData({
          chartdetail: result.data,
        })

        that.updateChartData();
      }
    })

},

/**
 * 更新图标信息
 */
updateChartData:function(){
 
  var categories = [];
  var dataarray=[];
  if (this.data.type_tab_id==0){
    chartData.main.title = "充值人数";
    for (var i=0; i < this.data.chartdetail.grade_list.length;i++){
      categories.push(this.data.chartdetail.grade_list[i].grade_name);
      dataarray.push(this.data.chartdetail.grade_list[i].recharge_total);
    }
    
  } else if (this.data.type_tab_id == 1){
    chartData.main.title = "充值金额";
    for (var i = 0; i < this.data.chartdetail.grade_list.length; i++) {
      categories.push(this.data.chartdetail.grade_list[i].grade_name);
      dataarray.push(this.data.chartdetail.grade_list[i].recharge_money);
    }

  } else if (this.data.type_tab_id == 2) {
    chartData.main.title = "绑定人数";
    for (var i = 0; i < this.data.chartdetail.grade_list.length; i++) {
      categories.push(this.data.chartdetail.grade_list[i].grade_name);
      dataarray.push(this.data.chartdetail.grade_list[i].bindTotal);
    }
  }

  chartData.main.data = dataarray;
  chartData.main.categories = categories;
  
  columnChart.updateData({
    categories: chartData.main.categories,
    series: [{
      name: chartData.main.title,
      data: chartData.main.data,
      // format: function (val, name) {
      //   return val.toFixed(2) + '万';
      // }
    }]
  });

},

setchartData:function(){
  var windowWidth = 320;
  try {
    var res = wx.getSystemInfoSync();
    windowWidth = res.windowWidth;
  } catch (e) {
    console.error('getSystemInfoSync failed!');
  }

  columnChart = new wxCharts({
    canvasId: 'columnCanvas',
    type: 'column',
    animation: true,
    categories: chartData.main.categories,
    series: [{
      name: '充值人数',
      data: chartData.main.data,
      // format: function (val, name) {
      //   return val.toFixed(2) + '万';
      // }
    }],
    yAxis: {
      format: function (val) {
        return val;
      },
      title: '',
      min: 0
    },
    xAxis: {
      disableGrid: false,
      type: 'calibration'
    },
    extra: {
      column: {
        width: 15
      }
    },
    width: windowWidth,
    height: 200,
  });
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.setchartData();



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isselectTime==true){
        this.setData({
          date_tab_id: 2,
          start_date: app.globalData.starttime,
          end_date: app.globalData.endtime
        });


        this.getchartInfo();
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

  }
})