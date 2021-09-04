const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
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
        },
        meetLocation: {
            type: String
        },
        status: {
            type: String,
            default: "For Sale"
        },
        buyerUsername: {
            type: String
        },
        offer: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;