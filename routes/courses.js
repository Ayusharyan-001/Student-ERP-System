const express = require("express");

const router = express.Router();

const courseController =
require("../controllers/courseController");

router.get(
    "/",
    courseController.getCourses
);

router.get(
    "/add",
    courseController.showAddForm
);

router.post(
    "/add",
    courseController.createCourse
);

module.exports = router;