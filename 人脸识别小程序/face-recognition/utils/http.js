var API_URL = 'https://api.face.fangaoyun.com/';
//获取应用实例
const app = getApp()
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        console.log("处理成功！！！！")
        console.log("返回值" )
        console.log(res)
        //成功
        // debugger
        if (res.data.errCode != 0 && res.data.errCode == 2100) {
          wx.hideToast()
          wx.setStorageSync("token", "");
          return;
        } else if (res.data.errCode != 0 && res.data.errCode != 2002){//2002登录失效
          // wx.showToast({
          //   title: res.data.errMsg ? res.data.errMsg:'加载中',
          //   icon: 'none',
          //   duration: 2000
          // })
        } else{
          wx.hideToast()
        }
        resolve(res.data)
      }
      obj.fail = function (res) {
        //失败
        wx.showToast({
          title: (res.data && res.data.errMsg) ? res.data.errMsg:'失败',
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
  // if (hide == undefined ){
  //   hide = false;
  // }
  // if (msg == undefined) {
  //   msg = "加载中";
  // }
 
  // if (!hide){
  //   wx.showToast({
  //     title: '加载中',
  //     icon: "loading",
  //     duration: 500000
  //   })
  // }

  var postRequest = wxPromisify(wx.request)
  console.log("请求接口" + api)
  console.log("请求参数")
  console.log(data)
  return postRequest({
    url: API_URL+api,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}

function request(api, data, token, appid, msg, hide) {
  // if (hide == undefined) {
  //   hide = false;
  // }
  // if (msg == undefined) {
  //   msg = "加载中";
  // }

  // if (!hide) {
  //   wx.showToast({
  //     title: '加载中',
  //     icon: "loading",
  //     duration: 500000
  //   })
  // }

  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: API_URL + api,
    method: 'POST',
    data: data,
    
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": token,

    },
  })
}


module.exports = {
  request: request,
  API_URL: API_URL

}