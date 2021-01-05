var API_URL = 'https://api.fangaoykt.100eks.cn/';
//获取应用实例
const app = getApp()
var apiAppid = ''
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        console.log("处理成功！！！！")
        console.log("返回值" )
        console.log(res)
        //成功
        if (res.data.code != 0 && res.data.code == 2100) {
          wx.hideToast()
          wx.setStorageSync("token", "");
          return;
        } else if (res.data.code != 0 && res.data.code != 2002 && res.data.code != 5000 ){//2002登录失效，5000是一卡通查询
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else{
          wx.hideToast()
        }
        resolve(res.data)
      }
      obj.fail = function (res) {
        //失败
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
     
        
        reject(res.data)
      }
      obj.complete = function(){
        
      }


     fn(obj)
    })
  }
}
function request(api, data , msg ,hide) {
  if (hide == undefined ){
    hide = false;
  }
  if (msg == undefined) {
    msg = "加载中";
  }
 
  if (!hide){
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500000
    })
  }

  var postRequest = wxPromisify(wx.request)
  console.log("请求接口" + api)
  console.log("请求参数")
  console.log(data)
  // alert(API_URL + api)
  return postRequest({
    url: API_URL+api,
    method: 'POST',
    data: {
      request: JSON.stringify(data)
    },
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}

function request(api, data, token, appid, msg, hide) {
  if (hide == undefined) {
    hide = false;
  }
  if (msg == undefined) {
    msg = "加载中";
  }

  if (!hide) {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500000
    })
  }
//  读取appid
  var isDirTrue = false;
  var apiAppid = "";
  try {
    if (wx.getFileSystemManager().accessSync(wx.env.USER_DATA_PATH + "/f1.txt") == undefined) {
      isDirTrue = true;
    }
  } catch (e) {
    console.log(e);
  }
  if (isDirTrue) {
   apiAppid = wx.getFileSystemManager().readFileSync(wx.env.USER_DATA_PATH + "/f1.txt", 'utf-8');
  }
  console.log(apiAppid);
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: API_URL + api,
    method: 'POST',
    data: {
      request: JSON.stringify(data)
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "token": token,
      "appid": apiAppid
      // app.globalData.apiAppid

    },
  })
}


module.exports = {
  request: request,
  API_URL: API_URL

}