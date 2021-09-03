const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        sellerUsername: {
            type: String,
            required: true
        },
        buyerUsername: {
            type: String,
            required: true
        },
        messages: {
            type: [{ user: String, body: String }],
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;