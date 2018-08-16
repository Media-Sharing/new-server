const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaData = new Schema({
    urlImage : {
        type : String,
        require : true
    },
    quote : {
        type : String,
        require : true
    },
    view : {
        type : Number,
        default : 0
    }
    
})

const Quote = mongoose.model('Quote',schemaData)

module.exports = Quote