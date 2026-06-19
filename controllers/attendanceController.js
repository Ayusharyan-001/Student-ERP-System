const pool = require("../config/db");

exports.getAttendance = async (req, res) => {

    try {

        const result =
            await pool.query(
                `
            SELECT

            a.attendance_id,
            s.full_name,
            a.attendance_date,
            a.status

            FROM attendance a

            JOIN students s
            ON a.student_id=s.student_id

            ORDER BY a.attendance_id
            `
            );

        res.render(
            "attendance/index",
            {
                attendance:
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

        res.render(
            "attendance/add",
            {
                students:
                    students.rows
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

exports.createAttendance = async (req, res) => {

    try {

        const {
            student_id,
            attendance_date,
            status
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


        if (!attendance_date) {

            return res.status(400).send(
                "Attendance date is required"
            );

        }

        if (
            status !== "Present" &&
            status !== "Absent"
        ) {

            return res.status(400).send(
                "Invalid attendance status"
            );

        }

        if (student.rows.length === 0) {

            return res.status(404).send(
                "Student not found"
            );

        }




        await pool.query(
            `
            INSERT INTO attendance
            (
                student_id,
                attendance_date,
                status
            )
            VALUES
            ($1,$2,$3)
            `,
            [
                student_id,
                attendance_date,
                status
            ]
        );

        return res.redirect(
            "/attendance"
        );

    }
    catch (err) {

        console.error(err);

        return res.status(500).send(
            "Internal Server Error"
        );

    }

};