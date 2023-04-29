import express from "express";
import Product from "../Models/InventoryModel.js";
import { io } from '../server.js'

 


const inventoryRouter = express.Router();



//Retrieve the entire inventory
 
inventoryRouter.get(
  '/',
  async (req, res) => {

    try {

      const products = await Product.find();

      if (products) {

        res.send(products);

      } 
      
      else {
        res.status(404).send({ message: 'Products Not Found' });
      }

    }

    catch(err) {
      res.status(404).send({message : `Error in finding all products, error message : ${err}`});
    }

    
    
  }
);



//Retrieve a single item from the inventory 
 
inventoryRouter.get(
  '/:id',
  async (req, res) => {

    try {

      const product = await Product.findById(req.params.id);

      if (product) {
        res.send(product);
      } 
      
      else {

        res.status(404).send({ message: 'Product Not Found' });

      }

    }

    catch(err) {
      res.status(404).send({message : `Error in finding product, error message : ${err}`});

    }

    
    
  }
);




//Add a new item to the inventory 

inventoryRouter.post(
    '/',
    async (req, res) => {

      try {

        const newProduct = new Product(req.body);
      
        //save new item to database
        const product = await newProduct.save();


        
        const products = await Product.find();

        //update all clients connected to the socket with new item
        io.sockets.emit('product-added', products);

    
        res.status(201).send({ message: 'New Product Created', product });

      }

      catch(err) {
        res.status(404).send({message : `Error in creating new product, error message : ${err}`});

      }

      
  
    }
);
  


//Update an existing item in the inventory 

inventoryRouter.put(
  '/:id',
  async (req, res) => {

    try {

      const product = await Product.findById(req.params.id);

      if (product) {

        product.productName = req.body.productName || product.productName;
        product.productDesc = req.body.productDesc  || product.productDesc;
        product.category = req.body.category  || product.category;
        product.quantity = req.body.quantity  || product.quantity;
        product.productWeight = req.body.productWeight || product.productWeight;
        product.productLength = req.body.productLength || product.productLength;
        product.productBreadth = req.body.productBreadth || product.productBreadth;
        product.productDepth = req.body.productDepth || product.productDepth;
        product.price = req.body.price || product.price;



        //update item to database
        const updatedProduct = await product.save();



        const products = await Product.find();

        //update all clients connected to the socket with updated item
        io.sockets.emit('product-updated', products);



        res.status(201).send({ message : 'Product updated', updatedProduct });
        
      } 
      
      else {
        res.status(404).send({ message: 'Product to be updated cannot be found' });
      }

    }

    catch(err) {
      res.status(404).send({message : `Error in updating product, error message : ${err}`});
    }


    
    
  }
);




//Remove an item from the inventory 

inventoryRouter.delete(
  '/:id',
  async (req, res) => {

    try {

      const product = await Product.findById(req.params.id);

      if(product) {

        //delete item from database
        await product.deleteOne();


        const products = await Product.find();

        //update all clients connected to the socket with deleted item
        io.sockets.emit('product-deleted', products);


        res.send({message: 'Product is deleted'});
      }

      else {
        res.status(404).send({message: 'Product to be deleted cannot be found'});
      }

    }


    catch(err) {
      res.status(404).send({message : `Error in deleting product, error message : ${err}`});

    }

  }

);



export default inventoryRouter;