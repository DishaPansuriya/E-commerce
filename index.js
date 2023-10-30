import express from "express";
import db from "./config/mongoose.js";
import router from "./router/route.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
