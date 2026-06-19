const pool = require("../config/db");

exports.attendanceReport = async (req,res)=>{

    try{

        const result =
        await pool.query(
            `
            SELECT

            s.full_name,

            ROUND(
            (
            SUM(
            CASE
            WHEN a.status='Present'
            THEN 1
            ELSE 0
            END
            )::numeric

            /

            COUNT(*)

            ) * 100,
            2
            )

            AS attendance_percentage

            FROM students s

            JOIN attendance a
            ON s.student_id=a.student_id

            GROUP BY s.full_name

            ORDER BY attendance_percentage DESC
            `
        );

        res.render(
            "reports/attendanceReport",
            {
                report:
                result.rows
            }
        );

    }
    catch(err){

        console.log(err);

    }

};

exports.topStudents = async (req,res)=>{

    try{

        const result =
        await pool.query(
            `
            SELECT

            s.full_name,

            ROUND(
            AVG(r.marks),
            2
            )

            AS average_marks

            FROM results r

            JOIN students s
            ON r.student_id=s.student_id

            GROUP BY s.full_name

            ORDER BY average_marks DESC
            `
        );

        res.render(
            "reports/topStudents",
            {
                report:
                result.rows
            }
        );

    }
    catch(err){

        console.log(err);

    }

};

exports.courseStats = async (req,res)=>{

    try{

        const result =
        await pool.query(
            `
            SELECT

            c.course_name,

            COUNT(e.student_id)
            AS total_students

            FROM courses c

            LEFT JOIN enrollments e
            ON c.course_id=e.course_id

            GROUP BY c.course_name

            ORDER BY total_students DESC
            `
        );

        res.render(
            "reports/courseStats",
            {
                report:
                result.rows
            }
        );

    }
    catch(err){

        console.log(err);

    }

};