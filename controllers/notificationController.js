const schedule = require("node-schedule");
const sendEmail = require("../services/sendEmail");

exports.scheduleNotification = (req, res) => {
  console.log("evoked");
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const now = new Date();
  const nextYear = new Date(now);
  nextYear.setFullYear(nextYear.getFullYear() + 1); 

  const job = schedule.scheduleJob(nextYear, function () {
    sendEmail(email, subject, message);
    console.log(`Notification sent to: ${email}`);
  });

  if (!job) {
    return res.status(500).send({ message: "Failed to schedule notification" });
  }

  res.send({
    message: "Notification scheduled successfully for next year.",
    nextInvocation: job.nextInvocation(),
  });
};

exports.getScheduledNotifications = (req, res) => {
  const scheduledJobs = schedule.scheduledJobs;
  const jobDetails = Object.keys(scheduledJobs).map((jobKey) => ({
    jobName: jobKey,
    nextInvocation: scheduledJobs[jobKey].nextInvocation(),
  }));

  res.json({
    message: "Scheduled notifications:",
    jobDetails,
  });
};
