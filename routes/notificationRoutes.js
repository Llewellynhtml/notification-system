const express = require("express");
const schedule = require("node-schedule");
const sendEmail = require("../services/sendEmail");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Notification System!");
});

router.post("/schedule-notification", (req, res) => {
  console.log("evoked");
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const now = new Date();
  const scheduledTime = new Date(now.getTime() + 60 * 1000);

  // set date dynamicallly from user data

  const job = schedule.scheduleJob(scheduledTime, function () {
    sendEmail(email, subject, message);
    console.log(`Notification sent to: ${email}`);
  });

  if (!job) {
    return res.status(500).send({ message: "Failed to schedule notification" });
  }

  res.send({
    message: "Notification scheduled successfully.",
    nextInvocation: job.nextInvocation(),
  });
});

router.get("/scheduled-notifications", (req, res) => {
  const scheduledJobs = schedule.scheduledJobs;
  const jobDetails = Object.keys(scheduledJobs).map((jobKey) => ({
    jobName: jobKey,
    nextInvocation: scheduledJobs[jobKey].nextInvocation(),
  }));

  res.json({
    message: "Scheduled notifications:",
    jobDetails,
  });
});

module.exports = router;
