require('module-alias/register')
let config = require('./config')
const fs = require('fs')
const path = require('path')
const cluster = require('cluster')
const startFunc = require('./app')

// 动态读取文件，重写module.exports方法
function myRequire(name) {
	const file = fs.readFileSync(name).toString()
	let module = {}
	eval(file) // 慎用，危险
	return module.exports;
}

if (cluster.isMaster) {
	console.log('主进程启动了')

	// 主进程每隔1s检测是否有版本更新，若有更新做热更新处理
	setInterval(() => {
		
		let newConfig = myRequire(path.resolve(__dirname, './config.js'))
		for (let name in newConfig.apps) {
			let newApp = newConfig.apps[name];
			let oldApp = config.apps[name];

			if (newApp.version != oldApp.version) {
				//启动一个新的进程
				newApp.name = name;
				newApp.worker = createWoker(newApp);

				//通知老的进程close
				oldApp.worker.send('close');
			} else {
				newApp.worker = oldApp.worker;
			}
		}
		config = newConfig;
	}, 1000)

	// 创建子进程
	function createWoker(app) {
		if (!app.enabled) return;
		// worker => child process
		let worker = cluster.fork();

		worker.on('exit', code => {
			console.log('子进程退出了', code);
			if (code) { // 非正常退出，1s后自动重启子进程
				//重启子进程
				setTimeout(function () {
					createWoker(app);
				}, 1000);
			}
		});

		console.log('新的子进程:', app.name, app.version);
		worker.send(app);
		return worker;
	}

	for (let key in config.apps) {
		const app = config.apps[key]
		app.name = key

		let worker = createWoker(app)
		app.worker = worker
	}
} else {
	let httpd;
	process.on('message', async config => {
		if (config === 'close') {
			httpd.close(() => {
				console.log('老进程退出了')
				process.exit(0)
			})
		} else {
			httpd = await startFunc(config)
		}
	})
}