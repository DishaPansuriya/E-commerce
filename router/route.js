import express from "express";
import userAccountController from "../controller/userAccountController.js";
import middleWare from "../config/middleWare.js";

const router = express.Router();

let userAccount = new userAccountController();
let userAuth = new middleWare();

router.post("/ecommerce/login", userAccount.login);
router.post("/ecommerce", userAuth.verifytoken, userAccount.listUseracc);
router.post("/ecommerce/add", userAccount.insertUserAcc);
router.post("/ecommerce/update", userAccount.updateUserAcc);
router.delete("/ecommerce/delete", userAccount.deleteUserAcc);

export default router;
