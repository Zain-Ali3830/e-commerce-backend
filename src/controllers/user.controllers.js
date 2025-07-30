import pool from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;
// signup User
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, phone, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt);

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await pool.query(
      "INSERT INTO users (fullName,email,password,phone,confirmPassword) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [fullName, email, hashedPassword, phone, hashedConfirmPassword]
    );
    res.json({
      message: "user created",
      user: user.rows[0],
    });
    console.log(user);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Login User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(user.rows[0]);
    if (user.rows.length === 0) {
      return res.json({
        message: "User not found",
      });
    }
    const userData = user.rows[0];
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return res.json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user.rows[0].id }, SECRET, {
      expiresIn: "1d",
    });
    res.json({
      message: "Login successful",
      user: user.rows[0],
      token: token,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};


// Function to delete all users 
export const deleteUser = async (req, res) => {
  const result = await pool.query("DELETE FROM users");
  res.json({
    message: "All users deleted",
    data: result.rows,
  });
}


export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
