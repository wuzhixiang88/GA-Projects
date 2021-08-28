const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
    {
        sellerUsername: {
            type: String,
            required: true
        },
        buyerUsername: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productImg: {
            type: String
        },
        offer: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "Offered"
        }
    },
    {
        timestamps: true
    }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;