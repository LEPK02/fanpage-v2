# Fanpage v4
## Open documentation files with
[DrawIO](https://app.diagrams.net/)
## v 4.0.3
- Backend
	- [Refresh Token](https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/)
## v 4.0.2
- Backend
	- [JWT Authentication](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)
		- To connect to the DB, create server\app\config\db.config.js with DB connection parameters (used in server.js)
			module.exports = {
				HOST: "",
				PASSWORD: "",
				DB: "",
				DB_NAME: ""
			};
		- Routes
			- POST /auth/register
			- POST /auth/login
			- GET /all for public access
			- GET /user for logged in users (any role)
			- GET /mod for moderator users
			- GET /admin for admin users
## v 4.0.1
- Frontend
	- [Login, register](https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/)
	- [Dark/light mode](https://codesandbox.io/s/ekeun?file=/src/components/Header.js)
## Fixes
## v 4.0.3.1
- Minor frontend fixes