const path = require('path')
module.exports = {
	apps: {
		admin: {
			version: '0.0.2',
			enabled: true,
			entry: path.resolve(__dirname, './apps/admin'),
			tmplRoot: path.resolve(__dirname, './apps/admin/template'),
			minifyTmpl: true,
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
			database: 'mysql'
		}
	},
	redis: {
		main: {
			host: "47.107.155.105",
			port: 6379,
			password: '111111'
		}
	}
}