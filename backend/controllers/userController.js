const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a User
exports.registerUser = catchAsyncErrors( async(req,res,next) => {
    const {name,email,password} = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl",
        },
    });

    sendToken(user,201,res);

    // const token = newUser.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     token
    // })
})


// Login User
exports.loginUser = catchAsyncErrors( async(req,res,next) => {
    const {email,password} = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("Please Enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    console.log(user);
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

    sendToken(user,200,res);

    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })
})