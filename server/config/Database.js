const mongoose = require("mongoose")
require("dotenv").config()

const DbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(console.log("DB Connection is Successful"))
    .catch((err)=>{
        console.log("Error in DB Connection");
        console.error(err);
        process.exit(1);
    })
}

module.exports = DbConnection