const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const User  = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        next(new ErrorHander("Please login to view resource",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
})