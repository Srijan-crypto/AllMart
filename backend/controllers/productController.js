const Product = require("../models/productModel");


//Create a new Product --> ADMIN only
exports.createProduct = async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}


//Get all Products
exports.getAllProducts = async (req,res)=>{
    const allProd = await Product.find();
    res.status(200).json({
        success:true,
        allProd
    })
}


//Update a Product --> ADMIN only
exports.updateProduct = async (req,res,next)=>{
    let currProd = await Product.findById(req.params.id);

    if(!currProd){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    currProd = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true, useFindAndModify:false});

    res.status(200).json({
        success:true,
        currProd
    })
}


//Delete a product --> ADMIN only
exports.deleteProduct = async (req,res,nest)=>{
    let currProd = await Product.findById(req.params.id);
    if(!currProd){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await currProd.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
}


//Get a single product details
exports.getProductDetails = async (req,res,next)=>{
    const currProd = await Product.findById(req.params.id);

    if(!currProd){
        return res.status(500).json({
            success:true,
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true,
        currProd
    })
}