const path = require('path')
module.exports = {
	apps: {
		admin: {
			enabled: true,
			entry: path.resolve(__dirname, './apps/admin'),
			port: 8080
		},
		meishi: {
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
	}
}