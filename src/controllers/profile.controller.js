import pool from "../db/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const setProfile=async (req,res)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    try {
        const {id}=decoded;
        console.log(id);
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


export const getProfile =async (req,res)=>{
    const {token} = req.headers;
    console.log(token);
    if(!token){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const {id}=decoded;
        const userCheck=await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        if(userCheck.rows.length===0){
            return res.json({
                message:"User not found",
            })
        }
        const result=await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        res.json({
            message:"Profile fetched",
            data:result.rows[0],
        })
    } catch (error) {
        res.json({
            message:error.message,
        })
    }
}