const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topics");

router.get("/topics",topicController.get_all_topics);
router.get("/topics/:id",topicController.get_topic_by_id);
router.get("/name",topicController.get_topic_by_name);

module.exports = router;