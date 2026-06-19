const pool = require("../config/db");

exports.getDashboard = async (req, res) => {

    try {

        const students =
            await pool.query(
                `
            SELECT COUNT(*)
            FROM students
            `
            );

        const courses =
            await pool.query(
                `
            SELECT COUNT(*)
            FROM courses
            `
            );

        const enrollments =
            await pool.query(
                `
            SELECT COUNT(*)
            FROM enrollments
            `
            );

        const attendance =
            await pool.query(
                `
    SELECT COUNT(*)
    FROM attendance
    `
            );

        const results =
            await pool.query(
                `
SELECT COUNT(*)
FROM results
`
            );

        const topPerformer =
            await pool.query(
                `
SELECT

s.full_name,

ROUND(
AVG(r.marks),
2
) AS avg_marks

FROM results r

JOIN students s
ON r.student_id=s.student_id

GROUP BY s.full_name

ORDER BY avg_marks DESC

LIMIT 1
`
            );

        res.render(
            "dashboard",
            {
                totalStudents:
                    students.rows[0].count,

                totalCourses:
                    courses.rows[0].count,

                totalEnrollments:
                    enrollments.rows[0].count,

                attendanceCount:
                    attendance.rows[0].count,

                totalResults:
                    results.rows[0].count,

                topPerformer:
                    topPerformer.rows[0]
            }
        );

    }
    catch (err) {

        console.log(err);

    }

};