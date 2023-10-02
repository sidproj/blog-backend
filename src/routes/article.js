const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articles");
const {requireAuth} = require("../middleware/auth");


router.get("/latest",articleController.get_latest_articles);
router.get("/topic/name/:id",articleController.get_articles_by_topic_name);
router.get("/topic/id/:id",articleController.get_articles_by_topic_id);
router.get("/:id",articleController.get_articles_by_id);
router.post("/comment/add",requireAuth,articleController.post_add_user_comments);
router.post("/comment/remove",requireAuth,articleController.post_remove_user_comments);

module.exports = router;