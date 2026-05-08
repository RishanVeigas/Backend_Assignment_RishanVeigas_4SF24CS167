const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createUser, findUserByEmail } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    findUserByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      createUser(name, email, hashedPassword, role, function (err) {
        if (err) {
          return res.status(500).json({
            message: "Failed to register user",
          });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    findUserByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
