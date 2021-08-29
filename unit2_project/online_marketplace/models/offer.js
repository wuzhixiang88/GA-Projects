const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
    {
        productID: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        sellerUsername: {
            type: String,
            required: true
        },
        buyerUsername: {
            type: String,
            required: true
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