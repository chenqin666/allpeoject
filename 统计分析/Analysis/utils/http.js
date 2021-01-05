var API_URL = 'https://portal.api.jiaxiao.100eks.com/';
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
        } else 
         
         if (res.data.code != 0 && res.data.code != 2002 && res.data.code != 5000 ){//2002登录失效，5000是一卡通查询
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

function request(api, data, token,msg, hide) {
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
 
  var postRequest = wxPromisify(wx.request)
  console.log(data)
  return postRequest({
    url: API_URL + api,
    method: 'POST',
    data: {
      request: JSON.stringify(data)
    },
    header: {
      "content-type": "application/x-www-form-urlencoded",
      "token": token
    },
  })
}


module.exports = {
  request: request,

}