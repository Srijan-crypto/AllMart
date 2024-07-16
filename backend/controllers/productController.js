const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create a new Product --> ADMIN only
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})


//Get all Products
exports.getAllProducts = catchAsyncErrors(async (req,res,next)=>{
    const productCount = await Product.countDocuments();
    const resultPerPage = 8;

    const apiFeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter();

    let product = await apiFeatures.query;
    let filteredProductsCount = product.length;
    apiFeatures.pagination(resultPerPage);

    const productsQuery = apiFeatures.query.clone();
    const allProd = await productsQuery;
    
    res.status(200).json({
        success:true,
        allProd,
        productCount,
        resultPerPage,
        filteredProductsCount,
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


// Create New Product Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req,res,next) => {
    const {rating,comment,productId} = req.body;

    const review = {
        user: req.user._id, //ID of user
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
    };

    const product = await Product.findById(productId);


    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString()); //Looped with loop variable name as rev

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }


    let sum=0;
    product.reviews.forEach((rev)=>{
        sum+=rev.rating;
    });

    product.ratings = sum / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
        message:"Review added successfully",
    })
}) 


//Get all Reviews of a Product
exports.getProductReview = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    })
})


//Delete Review
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString()); //all reviews except the one we want to delete

    let sum=0;
    reviews.forEach((rev)=>{
        sum+=rev.rating;
    })

    let ratings = 0;
    if(reviews.length===0) ratings=0;
    else ratings = sum/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    });

    res.status(200).json({
        success:true,
        message:"Review deleted successfully",
    })
})