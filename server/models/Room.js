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
    usersOnline: {
        type: [{
            name: String
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