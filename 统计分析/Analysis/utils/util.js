const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}


const formatDateMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [month, day].map(formatNumber).join('-')
}


const formatstartDate = date => {
var dd = new Date();
dd.setDate(dd.getDate() - 180);//获取AddDayCount天后的日期 
var y = dd.getFullYear();
var m = dd.getMonth() + 1;//获取当前月份的日期 
var d = dd.getDate();
return y + "-" + m + "-" + d; 
}

const formatLeaveDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 7
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}




const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const stringToYMD = fDate => {
  var strArray = fDate.split(" ");
  var fullDate = strArray[0].split("-");
  var fulltime = strArray[1].split(":");

  if (fullDate[0].indexOf("0") == 0) {
    fullDate[0] = parseInt(fullDate[0].substring(1));
  }

  if (fullDate[1].indexOf("0") == 0) {
    fullDate[1] = parseInt(fullDate[1].substring(1));
  }
  if (fullDate[2].indexOf("0") == 0) {
    fullDate[2] = parseInt(fullDate[2].substring(1));
  }
  if (fulltime[0].indexOf("0") == 0) {
    fulltime[0] = parseInt(fulltime[0].substring(1));
  }
  if (fulltime[1].indexOf("0") == 0) {
    fulltime[1] = parseInt(fulltime[1].substring(1));
  }
  if (fulltime[2].indexOf("0") == 0) {
    fulltime[2] = parseInt(fulltime[2].substring(1));
  }


  return formatDate(new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0));;
} 
// 字符串转换成日期
const getDateFromString=value=>{
  var fullDate = value.split("-");
  if (fullDate[0].indexOf("0") == 0) {
    fullDate[0] = parseInt(fullDate[0].substring(1));
  }

  if (fullDate[1].indexOf("0") == 0) {
    fullDate[1] = parseInt(fullDate[1].substring(1));
  }
  if (fullDate[2].indexOf("0") == 0) {
    fullDate[2] = parseInt(fullDate[2].substring(1));
  } 
 return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
}
// 获取日期差额
const getDatesDistance = (value1,value2) => {
  var iDays = parseInt(Math.abs(value1 - value2) / 1000 / 60 / 60 / 24);
  return iDays;
}


const stringToDate=fDate =>{
  var strArray=fDate.split(" ");
  var fullDate = strArray[0].split("-");
  var fulltime = strArray[1].split(":");

  if (fullDate[0].indexOf("0") == 0) {
    fullDate[0] = parseInt(fullDate[0].substring(1));
  } 

  if (fullDate[1].indexOf("0") == 0) {
    fullDate[1] = parseInt(fullDate[1].substring(1));
  } 
  if (fullDate[2].indexOf("0") == 0) {
    fullDate[2] = parseInt(fullDate[2].substring(1));
  } 
  if (fulltime[0].indexOf("0") == 0) {
    fulltime[0] = parseInt(fulltime[0].substring(1));
  } 
  if (fulltime[1].indexOf("0") == 0) {
    fulltime[1] = parseInt(fulltime[1].substring(1));
  } 
  if (fulltime[2].indexOf("0") == 0) {
    fulltime[2] = parseInt(fulltime[2].substring(1));
  } 
  var year = formatDate(new Date()).split("-")[0];
  if (year!= fullDate[0]){//不是同一年，直接显示年月日
    return formatDate(new Date(fullDate[0], fullDate[1] - 1, fullDate[2], fulltime[0], fulltime[1], fulltime[2]));
  }

  var etime = Date.parse(new Date());
  var stime = Date.parse(new Date(fullDate[0], fullDate[1] - 1, fullDate[2], fulltime[0], fulltime[1], fulltime[2]));
 
  var usedTime = etime - stime;  //两个时间戳相差的毫秒数
  var days = Math.floor(usedTime / (24 * 3600 * 1000));//天数
  //计算出小时数
  var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  var time = days + "天" + hours + "时" + minutes + "分";
  
  if(days==0&&hours==0&&minutes==0){
    return "刚刚";
  }
  if (days == 0 && hours == 0) {
    return minutes + "分钟前";
  }
  if (days == 0 ) {
    return hours + "小时前";
  }
  if (days == 1) {
    return "昨天";
  }
 
  return formatDateMonth(new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0));;
} 



function toastTap(test, icon) {
  wx.showToast({
    title: test,
    icon: icon == undefined ? "none" : "duration",
    duration: 1500
  })
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
   toastTap: toastTap,
  formatLeaveDate: formatLeaveDate,
  stringToDate: stringToDate,
  formatDateMonth: formatDateMonth,
  stringToYMD: stringToYMD,
  formatstartDate:formatstartDate,
  getDateFromString: getDateFromString,
  getDatesDistance: getDatesDistance,
}
