const mongoose = require('mongoose')

const createTagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("tag",createTagSchema)
