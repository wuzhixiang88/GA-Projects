const mongoose = require("mongoose");
const { Schema } = mongoose;

const threadSchema = new Schema(
    {
        buyerUsername: {
            type: String,
            required: true
        },
        sellerUsername: {
            type: String,
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        messages: {
            type: [
                { 
                    username: String,
                    body: String 
                }
            ],
        },
        offer: {
            type: Number,
        },
        status: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;