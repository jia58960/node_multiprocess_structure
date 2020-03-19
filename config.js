const path = require('path')
module.exports = {
	apps: {
		admin: {
			version: '0.0.1',
			enabled: true,
			entry: path.resolve(__dirname, './apps/admin'),
			port: 8080
		},
		meishi: {
			version: '0.0.1',
			enabled: true,
			entry: path.resolve(__dirname, './apps/meishi'),
			port: 8081
		}
	},
	databases: {
		web: {
			host: '192.168.138.100',
			port: 3306,
			user: 'ethan',
			password: '123456',
			database: 'meituan'
		}
	},
	redis: {
		main: {
			host: "192.168.138.100",
			port: 6379,
			password: undefined
		}
	}
}