import mongoose from 'mongoose';



const productSchema = new mongoose.Schema(

  {

    productName: { type: String, required: true },

    productDesc: { type: String, required: true },

    category: { type: String, required: true },

    quantity : { type: Number, required: true  },

    productWeight : { type: Number, required: true  },

    productLength : { type: Number, required: true  },

    productBreadth : { type: Number, required: true  },

    productDepth : { type: Number, required: true  },

    price : { type: Number, required: true  },
        
  },


  {
    timestamps: true,
  }

);

const Product = mongoose.model('Product', productSchema);

export default Product;