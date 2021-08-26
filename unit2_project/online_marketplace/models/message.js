const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
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
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;