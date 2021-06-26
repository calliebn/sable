const router = require("express").Router();
const yarnControllers = require("../../controllers/yarnControllers");

// Matches with "/api/yarns/"
router.route("/")
    .get(yarnControllers.findAll)
    .post(yarnControllers.create);

// Matches with "api/yarns/:id"
router
    .route("/:id")
    .get(yarnControllers.findById)
    .put(yarnControllers.update)
    .delete(yarnControllers.remove);

module.exports = router;
