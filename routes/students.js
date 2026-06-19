const express = require("express");

const router = express.Router();

const studentController =
require("../controllers/studentController");

router.get("/", studentController.getStudents);

router.get("/add", studentController.showAddForm);

router.post("/add", studentController.createStudent);

router.get(
    "/edit/:id",
    studentController.showEditForm
);

router.post(
    "/edit/:id",
    studentController.updateStudent
);

router.post(
    "/delete/:id",
    studentController.deleteStudent
);

module.exports = router;