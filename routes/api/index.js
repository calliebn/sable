const router = require("express").Router();
const yarnRoutes = require("./yarns-routes");
const userRoutes = require("./user-routes");

// Yarn routes
router.use("/yarns", yarnRoutes);

// User routes
router.use("/user", userRoutes);
router.use("/logout", userRoutes);

module.exports = router;
