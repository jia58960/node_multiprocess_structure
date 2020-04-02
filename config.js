const path = require('path')
const mode = process._argv.env === 'dev' ? 'dev' : 'prod'
module.exports = {
	apps: {
		web: {
			version: '0.0.2',
			enabled: true,
			entry: path.resolve(__dirname, './apps/web'),
			tmplRoot: path.resolve(__dirname, './apps/web/template'),
			minifyTmpl: true,
			cacheDir: mode === 'dev' ? __dirname : '/usr/share/nginx/html',
			port: 8080
		},
		meishi: {
			version: '0.0.1',
			enabled: true,
			entry: path.resolve(__dirname, './apps/meishi'),
			tmplRoot: path.resolve(__dirname, './apps/meishi/template'),
			minifyTmpl: true,
			port: 8081
		}
	},
	databases: {
		web: {
			host: '47.107.155.105',
			port: 3306,
			user: 'ethan',
			password: '123456',
			database: 'meituan'
		}
	},
	redis: {
		main: {
			host: "47.107.155.105",
			port: 6379,
			password: '111111'
		}
	},
	// 静态服务器列表
	staticServers: ['ethan1.mtw.cn', 'ethan2.mtw.cn', 'ethan3.mtw.cn']
}