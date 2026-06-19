const pool = require("../config/db");

exports.getStudents = async (req,res)=>{

    try{

        const search = req.query.search;

        let result;

        if(search){

            result = await pool.query(
                `
                SELECT *
                FROM students
                WHERE full_name ILIKE $1
                ORDER BY student_id
                `,
                [`%${search}%`]
            );

        }else{

            result = await pool.query(
                `
                SELECT *
                FROM students
                ORDER BY student_id
                `
            );

        }

       res.render(
    "students/index",
    {
        students: result.rows,
        search,
        totalStudents: result.rows.length
    }
);

    }
    catch(err){

        console.error(err);

    return res.status(500).render(
        "error",
        {
            message:
            "Internal Server Error"
        }
    );

    }

};

exports.showAddForm = (req,res)=>{

    res.render(
        "students/add"
    );

};

exports.createStudent = async (req,res)=>{

    try{

        const {
            full_name,
            email,
            phone,
            department,
            semester
        } = req.body;

        await pool.query(
            `
            INSERT INTO students
            (
                full_name,
                email,
                phone,
                department,
                semester
            )
            VALUES
            ($1,$2,$3,$4,$5)
            `,
            [
                full_name,
                email,
                phone,
                department,
                semester
            ]
        );

        res.redirect("/students");

    }
     catch(err){

        console.error(err);

        res.status(500).send(
            "Failed to create student"
        );

    }

};

exports.showEditForm = async (req,res)=>{

    try{

        const { id } = req.params;

        const result =
        await pool.query(
            `
            SELECT *
            FROM students
            WHERE student_id=$1
            `,
            [id]
        );

        if(result.rows.length === 0){

    return res.status(404).render(
        "error",
        {
            message: "Student not found"
        }
    );

}

res.render(
    "students/edit",
    {
        student: result.rows[0]
    }
);

    }
catch(err){

    console.error(err);

    res.status(500).render(
        "error",
        {
            message:
            "Something went wrong"
        }
    );

}

};

exports.updateStudent = async (req,res)=>{

    try{

        const { id } = req.params;

        const {
            full_name,
            email,
            phone,
            department,
            semester
        } = req.body;

        await pool.query(
            `
            UPDATE students

            SET

            full_name=$1,
            email=$2,
            phone=$3,
            department=$4,
            semester=$5

            WHERE student_id=$6
            `,
            [
                full_name,
                email,
                phone,
                department,
                semester,
                id
            ]
        );

        res.redirect(
            "/students"
        );

    }
    catch(err){

        console.error(err);

res.status(500).send(
    "Internal Server Error"
);

    }

};

exports.deleteStudent = async (req,res)=>{

    try{

        const { id } = req.params;

        await pool.query(
            `
            DELETE FROM students
            WHERE student_id=$1
            `,
            [id]
        );

        res.redirect(
            "/students"
        );

    }
    catch(err){

        console.error(err);

res.status(500).send(
    "Internal Server Error"
);

    }

};