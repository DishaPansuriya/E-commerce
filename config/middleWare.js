import jwt from "jsonwebtoken";

export default class Middleware {
  async verifytoken(req, res, next) {
    try {
      const token = req.headers.token;
      if (token) {
        try {
          let decoded = jwt.verify(token, "useracc");
          req.user = decoded;
        } catch (error) {
          console.log(error);
          res.status(400).send("Invalid Token!");
        }
      } else {
        res.status(400).send("Token Required!");
      }
      next();
    } catch (error) {
      console.log(error);
    }
  }

  async token(data) {
    try {
      let token = await jwt.sign(data, "useracc", { expiresIn: "1d" });
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}
