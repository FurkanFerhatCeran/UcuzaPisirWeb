import mongoose from 'mongoose';
import connectToMongoDB from './mongodb';

/**
 * Example Product Schema - shows how to define a model
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model only if it doesn't exist (prevents model redefinition errors on hot reload)
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

/**
 * Example function showing how to create a product
 * @param {Object} productData 
 * @returns {Promise<Object>} Created product
 */
export async function createProduct(productData) {
  // Always ensure we have a connection before working with models
  await connectToMongoDB();
  
  // Create a new product instance
  const product = new Product(productData);
  
  // Save to the database
  return await product.save();
}

/**
 * Example function showing how to fetch products
 * @param {Object} filter Query filter
 * @param {Object} options Query options
 * @returns {Promise<Array>} List of products
 */
export async function getProducts(filter = {}, options = {}) {
  // Connect to database
  await connectToMongoDB();
  
  // Find products that match the filter
  return await Product.find(filter, null, options);
}

// Usage example:
/*
  // Creating a product
  const newProduct = await createProduct({
    name: 'Laptop',
    description: 'A powerful laptop for developers',
    price: 1200,
    category: 'Electronics'
  });

  // Getting all products
  const allProducts = await getProducts();
  
  // Getting products with filters
  const electronicsProducts = await getProducts({ category: 'Electronics' });
  
  // Getting products with options (sorting, limiting)
  const paginatedProducts = await getProducts(
    {}, 
    { sort: { createdAt: -1 }, limit: 10, skip: 20 }
  );
*/ 