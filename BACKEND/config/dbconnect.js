const mongoose = require("mongoose");

const dbConnect = () => {
    try {
        const connection = mongoose.connect("mongodb+srv://ecommerce-db:w6cwLXvgzDoAZ3Ai@ecommerce.i9vlcva.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to database successfully...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;