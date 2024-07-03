const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const User  = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
    const {token} = req.cookies;
    // console.log(token);


    if(!token){
        return next(new ErrorHander("Please login to view resource",401));
    }

    // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await User.findById(decodedData.id);
    // next();

    let decodedData;
    try {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return next(new ErrorHander("Invalid or expired token, please login again", 401));
    }

    req.user = await User.findById(decodedData.id);

    if (!req.user) {
        return next(new ErrorHander("User not found, please login again", 404));
    }

    next();
})


exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}