const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        price: { 
            type: Number, 
            required: true
        },
        category: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;