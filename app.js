const express = require("express");
const app = express();
const studentRoutes = require("./routes/students");
const dashboardRoutes =
require("./routes/dashboard");
const courseRoutes =
require("./routes/courses");
const enrollmentRoutes =
require("./routes/enrollments");
const attendanceRoutes =
require("./routes/attendance");
const resultRoutes =
require("./routes/results");
const reportRoutes =
require("./routes/reports");


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/students", studentRoutes);

app.use(
    "/",
    dashboardRoutes
);

app.use(
    "/courses",
    courseRoutes
);

app.use(
    "/enrollments",
    enrollmentRoutes
);

app.use(
    "/attendance",
    attendanceRoutes
);

app.use(
    "/results",
    resultRoutes
);

app.use(
    "/reports",
    reportRoutes
);


app.listen(8080, () => {
    console.log("Server Running on Port 8080");
});