const express = require("express");
const router = express.Router();
const {requireAuth} = require("../middleware/auth");
const userController = require("../controllers/users");

router.post("/login",userController.login_post);
router.post("/register",userController.register_post);
router.post("/subscribe/add",requireAuth,userController.add_subscription);
router.post("/subscribe/remove",requireAuth,userController.remove_subscription);

module.exports = router;