var API_URL = 'https://api.fangaoykt.100eks.cn/';
function request(url, method, data, token,tip,hide) {
  if (tip == null || tip == "") {
    my.showLoading({ content: "加载中..." });
  } else {
    my.showLoading({ content: tip });
  }
  var promise = new Promise((resolve, reject, defaults) => {
    my.request({
      url: API_URL + url,
      headers: {
        "token": token,
        '2021002116636196':'2019090867080310'
      },
      method: method,
      data: {
          request: JSON.stringify(data)
        },
      timeout: 0,
      dataType: 'json',
      success: (result) => {
        my.hideLoading();
        resolve(result);
        console.log(result)
      },
      fail: (err) => {
        my.hideLoading();
        reject(err);
         console.log(err)
      },
      complete: () => {
        my.hideLoading();
        defaults;
      }
    });
  });
  return promise;
};

module.exports = {
  request: request,
  API_URL: API_URL

}