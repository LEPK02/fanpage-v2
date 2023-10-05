# Fanpage v2
## Open documentation files with
[DrawIO](https://app.diagrams.net/)
## v 2.0.7
- Frontend
	- Homepage
	- Teams page
	- Players page (incomplete)
- Bug fixes
	- Layout fixes
	- Navbar dropdown menu fix
## v 2.0.6.2
- Added breadcrumbs
	- [Dynamic breadcrumb routes](https://pavsaund.com/post/2022-02-23-dynamic-breadcrumbs-and-routes-with-react-router/)
- Bug fixes
	- [Close offcanvas menu on navigate](https://stackoverflow.com/questions/71211745/im-trying-to-close-the-offcanvas-menu-in-react-bootstrap-when-i-click-a-link)\
	- Register & login page
		- Fixed redirect links' active and hover states' styles
		- Fixed password requirement popup
		- Fixed show/hide password icon
## v 2.0.6.1
- Bug fixes
  - [Nginx 404 on refresh error](https://stackoverflow.com/questions/43555282/react-js-application-showing-404-not-found-in-nginx-server)
	- Fixed background
## v 2.0.6
- [Dockerize](https://www.bezkoder.com/docker-mern/)
	- Start container: docker-compose up --build -d
	- Access MongoDB shell:
		- docker exec -it \<mongoContainerId\> /bin/sh
		- mongosh --port 27017 -u root -p root --authenticationDatabase admin
		- use <dbName>
## v 2.0.5
- Navbar
## v 2.0.4
- Refresh Token
	- [Added Axios interceptors](https://www.bezkoder.com/redux-refresh-token-axios/)
- Persist theme colour
  - [React Persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
## v 2.0.3
- Refresh Token
	- [Backend](https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/)
	- [Frontend](https://www.bezkoder.com/redux-refresh-token-axios/)
- Minor fixes
	- [Store theme state in local storage using redux-persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/#:~:text=With%20the%20Redux%20Persist%20library,state%20will%20still%20be%20preserved.)
## v 2.0.2
- Backend
	- [JWT Authentication](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)
		- Routes
			- POST /auth/register
			- POST /auth/login
			- GET /all for public access
			- GET /user for logged in users (any role)
			- GET /mod for moderator users
			- GET /admin for admin users
## v 2.0.1
- Frontend
	- [Login, register](https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/)
	- [Dark/light mode](https://codesandbox.io/s/ekeun?file=/src/components/Header.js)