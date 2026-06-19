const pool = require("../config/db");

exports.getCourses = async (req,res)=>{

    try{

        const result =
        await pool.query(
            `
            SELECT *
            FROM courses
            ORDER BY course_id
            `
        );

        res.render(
            "courses/index",
            {
                courses: result.rows
            }
        );

    }
    catch(err){

        console.error(err);

    return res.status(500).render(
        "error",
        {
            message:
            "Failed to load courses"
        }
    );

    }

};

exports.showAddForm = (req,res)=>{

    try{

        res.render(
            "courses/add"
        );

    }
    catch(err){

        console.error(err);

        return res.status(500).render(
            "error",
            {
                message:
                "Unable to load page"
            }
        );

    }

};

exports.createCourse = async (req,res)=>{

    try{

        const {
            course_name,
            credits
        } = req.body;

        await pool.query(
            `
            INSERT INTO courses
            (
                course_name,
                credits
            )
            VALUES
            ($1,$2)
            `,
            [
                course_name,
                credits
            ]
        );

        res.redirect(
            "/courses"
        );

    }
    catch(err){

        console.error(err);

    return res.status(500).render(
        "error",
        {
            message:
            "Failed to create course"
        }

    );

    }

};