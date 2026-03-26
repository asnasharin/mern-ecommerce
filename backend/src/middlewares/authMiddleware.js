const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

// protected route
exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    return next(new Error("Not authorised, no token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      res.status(401);
      return next(new Error("Unauthorised user"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    next(new Error("Not authorised, token failed"));
  }
});

// admin access
exports.isAdmin = asyncHandler(async (req, res, next) => {
  try {
    // req.user already comes from protect middleware
    if (!req.user || req.user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error in admin middleware",
    });
  }
});