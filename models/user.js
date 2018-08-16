var mongoose = require('mongoose')

var Schema = mongoose.Schema
var blogUser = new Schema({
    first_name:  {
      type : String,
      required : true,
    },
    last_name :{
        type : String,
        required : true
    },
    email : {
      type : String,
      required : true
    },
    password : {
      type : String,
      required : true
    },
  });

var user = mongoose.model('User',blogUser)

module.exports = user