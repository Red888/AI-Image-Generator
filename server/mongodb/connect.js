import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true); 

    mongoose.connect(url)
    .then(() => console.log('MongoDB CONNECTED'))
    .catch((err) => console.log(err));
}

export default connectDB;