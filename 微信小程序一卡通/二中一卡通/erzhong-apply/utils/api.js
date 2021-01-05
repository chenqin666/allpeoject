module.exports = {
  wxlogin:'wechat.execute.auth',
  bindcards:'member.bind.cards',
  logincards:'member.binding.cards',
  unbind:'member.unbund.card',
  payment:'cashier.execute.payment',
  detail:'member.card.detail',
  monthlist: 'member.card.consume',
  monthlists: 'bill.query.lists',
  feepercent:'cashier.query.feepercent',
  findcard:'member.query.card',
  isopen: 'server.status.query', //检测学校是否开启
  entrance: 'server.check.status', //检测是否通过学校一卡通充值入口进入
  sendsms:'verify.send.sms',//发送短信验证码
  verification:'verify.execute.verification',//验证短信验证码
  orders: 'refund.query.orders',//获取需要退款的订单
  refundsub: 'refund.execute.submit',// 提交选择退款方式
  process: 'refund.query.process',// 取退款详情
} 