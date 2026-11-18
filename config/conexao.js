import mongoose from "mongoose";
const url = "mongodb+srv://biancasifuentesbg009_db_user:123@cluster0.umy3iz2.mongodb.net/";

await mongoose.connect(url);

export default mongoose;
