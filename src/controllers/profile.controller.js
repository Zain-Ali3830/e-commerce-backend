import pool from "../db/index.js";

export const setProfile=async (req,res)=>{
    try {
        const {id}=req.params;
        const {fullname, email, phone, password, confirmPassword}=req.body;
        const userCheck=await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if(userCheck.rows.length===0){
            return res.json({
                message:"User not found",
            })
        }
        const result=await pool.query("UPDATE users SET fullname=COALESCE($1,fullname), email=COALESCE($2,email), phone=COALESCE($3,phone), password=COALESCE($4,password), confirmPassword=COALESCE($5,confirmPassword) WHERE id=$6 RETURNING *", [fullname, email, phone, password, confirmPassword, id]);
        res.json({
            message:"Profile updated",
            data:result.rows[0],
        })
    } catch (error) {
        res.json({
            message:error.message,
        })
    }
}
