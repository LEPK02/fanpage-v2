/*
Authorization routes (CHANGED: remove /api/test)
- GET /all
- GET /user for logged in users (user/moderator/admin)
- GET /mod for moderator
- GET /admin for admin
*/
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // CHANGED
  // app.get("/api/test/all", controller.allAccess);
  app.get("/all", controller.allAccess);

  // CHANGED
  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    // CHANGED
    // "/api/test/mod",
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    // CHANGED
    // "/api/test/admin",
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};