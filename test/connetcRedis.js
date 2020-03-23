/**
 * 测试连接redis
 */
var redis = require('redis'),
  RDS_PORT = 6379, //端口号  
  RDS_HOST = '47.107.155.105', //服务器IP  要连接的服务器redis  
  RDS_PWD = '111111', //密码  
  RDS_OPTS = {}, //设置项  
  client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
client.auth(RDS_PWD, function () {
  console.log('通过认证');
});
client.on('connect', function () {
  client.set('author', 'Wilson', redis.print);
  client.get('author', redis.print);
  console.log('connect');
});
client.on('ready', function (err) {
  console.log('ready');
});