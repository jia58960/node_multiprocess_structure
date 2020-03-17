require('module-alias/register')
const config = require('./config')
const cluster = require('cluster')
const startFunc = require('./app')
if (cluster.isMaster) {
	console.log('主进程启动了')
	for (let key in config.apps) {
		const app = config.apps[key]
		if (!app.enabled) continue;
		const worker = cluster.fork()
		console.log('新的子进程:', key);
		worker.send(app)
	}
} else {
	process.on('message', config => {
		startFunc(config)
	})
}