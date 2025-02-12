const express = require("express");
const {
  scheduleNotification,
  getScheduledNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/schedule-notification", scheduleNotification);
router.get("/scheduled-notifications", getScheduledNotifications);

module.exports = router;
