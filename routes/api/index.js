const router = require("express").Router();
const yarnRoutes = require("./yarns-routes");

// Yarn routes
router.use("/yarns", yarnRoutes);

module.exports = router;