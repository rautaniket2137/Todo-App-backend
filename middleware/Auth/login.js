import userModel from "../../module/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const UserExits = await userModel.findOne({ email });
//     if (!UserExits) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, UserExits.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }

//     // Create JWT token
    



//     // ✅ generate token
//     const token = jwt.sign(
//       { id: UserExits._id },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_TOKEN_EXPIRATION || "7d" }
//     );
    
//      return res.status(200).json({
//       message: "User login successfully",
//       token,
//       user: {
//         id: UserExits._id,
//         username: UserExits.username,
//         email: UserExits.email,
//       },
//     });

    
//   } catch (error) {
//     res.status(500).json({ message: "server error" });
//   }
// };


export const login = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await userModel.findOne({ email });
    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });

  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};