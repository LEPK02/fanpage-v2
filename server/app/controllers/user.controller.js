/*
Controller for testing Authorization (CHANGED: remove api/test)
– /all for public access
– /user for loggedin users (any role)
– /mod for moderator users
– /admin for admin users
*/
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content");
};