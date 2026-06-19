const express = require("express");

const router = express.Router();

const enrollmentController =
require("../controllers/enrollmentController");

router.get(
    "/",
    enrollmentController.getEnrollments
);

router.get(
    "/add",
    enrollmentController.showAddForm
);

router.post(
    "/add",
    enrollmentController.createEnrollment
);

module.exports = router;