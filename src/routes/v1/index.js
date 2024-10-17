const express = require("express");
const userRouter = require("./users-routes");
const urlRouter = require("./url-routes");
const {
  authenticateJWT,
} = require("../../middlewares/auth");
const router = express.Router();

router.use("/users", userRouter);
router.use("/url", authenticateJWT, urlRouter);

module.exports = router;
