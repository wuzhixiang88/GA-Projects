const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        userOne: {
            type: String,
            required: true
        },
        userTwo: {
            type: String,
            required: true
        },
        messages: {
            type: [
                { 
                    username: String,
                    body: String 
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;