import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
const db = mongoose.connection;
db.on("error", console.error.bind(console, `DB is not connected!`));
db.once("open", () => console.log(`DB is connected!`));

export default db;