const redis = require('redis')
const bluebird = require('bluebird')
const config = require('../config.js')
const _redis = require('@/core/_redis')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = async function () {
  for (let key in config.redis) {
    // 用来检测连接是否成功,名字越特殊越好
    let client = redis.createClient(config.redis[key]);

    await client.setAsync('__$$name$', 99);
    if (99 != await client.getAsync('__$$name$')) {
      throw 'redis init faild';
    }
    await client.delAsync('__$$name$');

    _redis[key] = client
  }
}