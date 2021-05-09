const {Schema,model} = require('mongoose')

const schema = new Schema({
    title:{
        type:String,
        required:true
    },
    creator: String,
    lastMessage:{
        type:String,
    },
    dateOfLastMessage: {
        type: Date,
    },
    users: {
        type: [{
            name: String,
            status: String,
            socketId: String
        }],
    },
    messages: {
        type: [{
            from: String,
            date: Date,
            text: String
        }],
    },

})

module.exports = model('Room', schema)