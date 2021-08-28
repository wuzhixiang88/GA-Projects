const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema(
    {
        sellerUsername: {
            type: Schema.Types.String,
            ref: "User"
        },
        buyerUsername: {
            type: Schema.Types.String,
            ref: "User"
        },
        productName: {
            type: Schema.Types.String,
            ref: "Product"
        },
        productImg: {
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

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;