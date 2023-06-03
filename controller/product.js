const fs = require('fs');
const model = require('../model/product')
const mongoose = require('mongoose');
const Product = model.Product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);;
  await product.save()
  res.json(product)
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = +req.params.id;
  const product = await Product.findOne({id: id});
  res.json(product);
};

exports.replaceProduct = async (req, res) => {
  const id = +req.params.id;
  try{
  const doc = await Product.findOneAndReplace({id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = +req.params.id;
  try{
  const doc = await Product.findOneAndUpdate({id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndDelete({id:id})
  res.status(204).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
