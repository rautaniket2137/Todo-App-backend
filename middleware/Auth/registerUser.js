import express from "express"
import  bcrypt from "bcrypt";
import userModel from "../../module/User.js";
import jwt from "jsonwebtoken";

export const userRegistation = async (req, res) => {
  const { username, email, password } = req.body;
    console.log(req.body);

  try {
    // ✅ validation
    if (!username|| !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ check user exists
    const userExits = await userModel.findOne({ email });

    if (userExits) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ generate token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION || "7d" }
    );

    // ✅ SINGLE response (IMPORTANT)
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
