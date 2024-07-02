const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create a new Product --> ADMIN only
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


//Get all Products
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const productCount = await Product.countDocuments();
    const resultPerPage = 5;

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

    const allProd = await apiFeatures.query;
    res.status(200).json({
        success:true,
        allProd,
        productCount
    })
})


//Update a Product --> ADMIN only
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let currProd = await Product.findById(req.params.id);

    if(!currProd){
        return next(new ErrorHander("Product not found",404));
    }

    currProd = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true, useFindAndModify:false});

    res.status(200).json({
        success:true,
        currProd
    })
})


//Delete a product --> ADMIN only
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    let currProd = await Product.findById(req.params.id);
    if(!currProd){
        return next(new ErrorHander("Product not found",404));
    }

    await currProd.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})


//Get a single product details
exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    const currProd = await Product.findById(req.params.id);

    if(!currProd){
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        currProd
    })
})