/*
User collection
User object will have a roles array that contains ids of roles collection as reference

Mongoose in-built CRUD functions:
- Create User: object.save()
- Find User by:
  - id: User.findById(id)
  - email: User.findOne({ email: … })
  - username: User.findOne({ username: … })
- Find Roles in array by id: Role.find({ name: { $in: roles } })
*/
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;