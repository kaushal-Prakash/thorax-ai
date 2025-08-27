import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

// Helper to create JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "7d" });
};

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// SIGNOUT
const signout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Signout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CHANGE NAME
const changeName = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const userId = req.user._id;
    const { newName } = req.body;

    if (!newName) {
      return res.status(400).json({ message: "New name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: newName },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Name updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Change name error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// AUTH CHECK
const isAuthenticated = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Authorized" });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET USER
const getUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  signup,
  login,
  signout,
  changeName,
  changePassword,
  isAuthenticated,
  getUser,
};
