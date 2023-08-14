# Fanpage v4
## Open documentation files with
[DrawIO](https://app.diagrams.net/)
## v 4.0.6
- [Dockerize](https://www.bezkoder.com/docker-mern/)
	- Start container: docker-compose up --build -d
	- Access MongoDB shell:
		- docker exec -it \<mongoContainerId\> /bin/sh
		- mongosh --port 27017 -u root -p root --authenticationDatabase admin
		- use <dbName>
## v 4.0.5
- Navbar
## v 4.0.4
- Refresh Token
	- [Added Axios interceptors](https://www.bezkoder.com/redux-refresh-token-axios/)
- Persist theme colour
  - [React Persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
## v 4.0.3
- Refresh Token
	- [Backend](https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/)
	- [Frontend](https://www.bezkoder.com/redux-refresh-token-axios/)
- Minor fixes
	- [Store theme state in local storage using redux-persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/#:~:text=With%20the%20Redux%20Persist%20library,state%20will%20still%20be%20preserved.)
## v 4.0.2
- Backend
	- [JWT Authentication](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)
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