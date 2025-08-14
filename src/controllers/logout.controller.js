import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db/index.js";
dotenv.config();
export const logout= async(req,res)=>{
    const {token} = req.headers;
    console.log(token);
    if(!token){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    try{
        const {id} = decoded;
        const userCheck = await pool.query("SELECT FROM users WHERE id=$1", [id]);
        if(userCheck.rowCount === 0){
            return res.json({
                message:"User not found",
            });
        }
        res.status(200).json({
            message:"Logout successful",
        });
    }
    catch(error){
        res.json({
            message:error.message,
        });
    }
}