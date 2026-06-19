const express = require("express");

const router = express.Router();

const attendanceController =
require("../controllers/attendanceController");

router.get(
    "/",
    attendanceController.getAttendance
);

router.get(
    "/add",
    attendanceController.showAddForm
);

router.post(
    "/add",
    attendanceController.createAttendance
);

module.exports = router;