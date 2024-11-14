const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify")
const User = require("../models/userModel")
const {validateMongoDbId} = require("../utils/validateMongoDb");

const createProduct = asyncHandler(async (req, res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
       const newProduct = await  Product.create(req.body);
       res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
})


const updateProduct = asyncHandler(async (req, res)=>{
    const id = req.params;
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        // const updateProduct = await Product.findOneAndUpdate({id},req.body,{
        //     new : true
        // });
        // res.json(updateProduct)
        const productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body , {
            new: true,
            runValidators:true,
            useFindAndModify: false
            })
            res.status(201).json({message:"Updated Successfully", data: productToUpdate});
            }catch(err){
                throw new Error(err)
                }
})

const deleteProduct = asyncHandler(async (req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Deleted successfully',data:deletedProduct});
        }catch(err){
            throw new Error(err)
            }
})

const getAProduct = asyncHandler(async (req,res)=>{
    try {
        const findProduct = await Product.findById(req.params.id).populate("color")
        res.json(findProduct)
    } catch (error) {
        throw new Error(error);
    }
})

const getAllProduct = asyncHandler(async (req,res)=>{
    try {
    // Filtering
    const queryObj = {...req.query};
    const excludeField = ["page", "sort", "limit", "fields"];
    excludeField.forEach(el =>{
        delete queryObj[el];
    })
    console.log(queryObj, req.query);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`)
    let query = Product.find(JSON.parse(queryStr));

    // Sorting                                          

    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy)
    }else{
        query = query.sort("-createdAt");
    }

    // Limiting the fields
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }else{
        query = query.select('-__v');
    }

    // pagination
    const pageSize = parseInt(req.query.limit) || 25;
    const pageNumber = parseInt(req.query.page) || 1;
    const totalProducts = await Product.countDocuments();
    const skip = (pageNumber - 1)*pageSize
    query = query.skip(skip).limit(pageSize);
    if(req.query.pageNumber){
        if(skip >= totalProducts) throw new Error("This page does not exist")
    }    

    const products = await query;
    // const getAllProducts = await Product.find(queryObj);
    res.json(products);  
    } catch (error) {
        throw new Error(error)
    }
})

const addToWishList = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id)=>{
            return id.toString() === prodId;
        })
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id, {
                $pull : { wishlist : prodId }
            },{
                new : true
            });
            res.json(user);
        }else{
            let user = await User.findByIdAndUpdate(_id, {
                $push : { wishlist : prodId }
            },{
                new : true
            });
            res.json(user);
        }
    } catch (error) {
        throw new Error(error)
    }
})

const rating = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {star, prodId,comment } = req.body;
    try {
        const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find((userId)=> userId.postedby.toString() === _id.toString())
    if(alreadyRated){
        const updatedRating = await Product.updateOne(
            { ratings : {
                $elemMatch : alreadyRated
            }
        },{
                $set : { "ratings.$.star": star, "ratings.$.comment": comment }
            },{
                new : true
            }
        );
    }else{
        const rateProduct = await Product.findByIdAndUpdate(prodId, {
            $push : {
                ratings : {
                    star : star,
                    comment : comment,
                    postedby : _id
                }
            }
        },{
            new : true
        })
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
    .map((item)=> item.star)
    .reduce((prev,curr)=> prev+curr,0);
    let actualRating = Math.round(ratingSum/totalRating);
    let finalProduct = await Product.findByIdAndUpdate(prodId, {
        totalrating : actualRating
    }, {
        new : true
    });
    res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {createProduct , getAProduct, getAllProduct , updateProduct, deleteProduct, addToWishList, rating}
