const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String,
    establishedYear:Number,
    location:String
});

module.exports=mongoose.model("Company",companySchema);