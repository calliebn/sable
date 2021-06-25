const router = require("express").Router();
const userControllers = require("../../controllers/userControllers");

// Matches with "/api/login"
router.route("/")
    .post(userControllers.create);

router.route("/:id")
    .get(userControllers.findbyId)
    .delete(userControllers.remove);

module.exports = router;