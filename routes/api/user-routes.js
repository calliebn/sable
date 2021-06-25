const router = require("express").Router();
const userControllers = require("../../controllers/userControllers");

// Matches with "/api/login"
router.route("/login")
    .post(userControllers.create);

router.route("/:id")
    .get(userControllers.findById)
    .delete(userControllers.remove);

module.exports = router;