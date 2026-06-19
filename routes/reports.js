const express = require("express");

const router = express.Router();

const reportController =
require("../controllers/reportController");

router.get(
    "/attendance",
    reportController.attendanceReport
);

router.get(
    "/top-students",
    reportController.topStudents
);

router.get(
    "/course-stats",
    reportController.courseStats
);

module.exports = router;