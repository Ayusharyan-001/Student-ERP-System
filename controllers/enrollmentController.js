const pool = require("../config/db");

exports.getEnrollments = async (req,res)=>{

    try{

        const result =
        await pool.query(
            `
            SELECT

            e.enrollment_id,

            s.full_name,

            c.course_name

            FROM enrollments e

            JOIN students s
            ON e.student_id=s.student_id

            JOIN courses c
            ON e.course_id=c.course_id

            ORDER BY e.enrollment_id
            `
        );

        res.render(
            "enrollments/index",
            {
                enrollments:
                result.rows
            }
        );

    }
    catch(err){

        console.log(err);

    }

};

exports.showAddForm = async (req,res)=>{

    try{

        const students =
        await pool.query(
            `
            SELECT *
            FROM students
            ORDER BY full_name
            `
        );

        const courses =
        await pool.query(
            `
            SELECT *
            FROM courses
            ORDER BY course_name
            `
        );

        res.render(
            "enrollments/add",
            {
                students: students.rows,
                courses: courses.rows
            }
        );

    }
    catch(err){

        console.log(err);

    }

};

exports.createEnrollment = async (req,res)=>{

    try{

        const {
            student_id,
            course_id
        } = req.body;

        await pool.query(
            `
            INSERT INTO enrollments
            (
                student_id,
                course_id
            )
            VALUES
            ($1,$2)
            `,
            [
                student_id,
                course_id
            ]
        );

        res.redirect(
            "/enrollments"
        );

    }
    catch(err){

        console.log(err);

    }

};