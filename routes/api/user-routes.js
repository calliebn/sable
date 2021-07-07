const express = require("express")

const router = require("express").Router();
const userControllers = require("../../controllers/userControllers");

// Matches with "/api/login"
router.route("/login")
    .post(userControllers.create);

// Creates a new user
router.route("/")
    .post(userControllers.create);

router.route("/:id")
    .get(userControllers.findById)
    .delete(userControllers.remove);

router.route("/logout")
    .post(userControllers.remove);

module.exports = router;








// const express = require("express");
// const router = express.Router();
// const userSchema = require("../../models/user");

// router.post("/signup", (req, res) => {
//   const signupUser = new userSchema({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   signupUser
//     .save()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// module.exports = router;

