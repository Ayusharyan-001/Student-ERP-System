const pool = require("../config/db");

exports.getResults = async (req, res) => {

    try {

        const result =
            await pool.query(
                `
            SELECT

            r.result_id,
            s.full_name,
            c.course_name,
            r.marks,
            r.grade

            FROM results r

            JOIN students s
            ON r.student_id=s.student_id

            JOIN courses c
            ON r.course_id=c.course_id

            ORDER BY r.result_id
            `
            );

        res.render(
            "results/index",
            {
                results:
                    result.rows
            }
        );

    }
    catch (err) {

        console.error(err);

        return res.status(500).send(
            "Internal Server Error"
        );

    }

};

exports.showAddForm = async (req, res) => {

    try {

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
            "results/add",
            {
                students:
                    students.rows,

                courses:
                    courses.rows
            }
        );

    }
    catch (err) {

        console.error(err);

        return res.status(500).send(
            "Internal Server Error"
        );

    }

};

exports.createResult = async (req, res) => {

    try {

        const {
            student_id,
            course_id,
            marks
        } = req.body;

        const student =
            await pool.query(
                `
    SELECT *
    FROM students
    WHERE student_id = $1
    `,
                [student_id]
            );

        if (student.rows.length === 0) {

            return res.status(404).send(
                "Student not found"
            );

        }

        const course =
            await pool.query(
                `
    SELECT *
    FROM courses
    WHERE course_id = $1
    `,
                [course_id]
            );

        if (course.rows.length === 0) {

            return res.status(404).send(
                "Course not found"
            );

        }

        if (marks < 0 || marks > 100) {

            return res.status(400).send(
                "Marks must be between 0 and 100"
            );

        }

        let grade;

        if (marks >= 90) {

            grade = "A";

        }
        else if (marks >= 75) {

            grade = "B";

        }
        else if (marks >= 60) {

            grade = "C";

        }
        else {

            grade = "F";

        }

        await pool.query(
            `
            INSERT INTO results
            (
                student_id,
                course_id,
                marks,
                grade
            )
            VALUES
            ($1,$2,$3,$4)
            `,
            [
                student_id,
                course_id,
                marks,
                grade
            ]
        );

        res.redirect(
            "/results"
        );

    }
    catch (err) {

        console.error(err);

        return res.status(500).send(
            "Internal Server Error"
        );

    }

};