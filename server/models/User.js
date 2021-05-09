const {Schema,model} = require('mongoose')

const schema = new Schema({
    username:{
        type:String,
        required:true
    },
    socketId: String
})

module.exports = model('User', schema)