const router = require("express").Router();
const userControllers = require("../../controllers/userControllers");

// Matches with "/api/user/login"
router.route("/login")
    .post(userControllers.findByUsername);

// Creates a new user
router.route("/")
    .post(userControllers.create);

router.route("/:id")
    .get(userControllers.findByUsername)
    .delete(userControllers.remove);

router.route("/logout")
    .post(userControllers.remove);

module.exports = router;