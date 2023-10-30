import _userAccount from "../model/userAccountSchema.js";
import bcrypt from "bcrypt";
import middleWare from "../config/middleWare.js";

const jwt = new middleWare();

export default class UserAccount {
  async listUseracc(req, res) {
    try {
      const response = {};
      let data = await _userAccount.aggregate([{ $sort: { _id: -1 } }]);

      if (data) {
        response.status = 200;
        response.message = "okay";
        response.data = data;
      } else {
        response.status = 404;
        response.message = "Data not found!";
      }
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }

  async insertUserAcc(req, res) {
    try {
      const response = {};
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const model = await new _userAccount(req.body);
      let data = await model.save();

      if (data) {
        response.status = 200;
        response.message = "Data inserted successfully";
        response.data = data;
      } else {
        response.status = 404;
        response.message = "Please enter the require data!";
      }

      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserAcc(req, res) {
    try {
      const response = {};

      req.body.password = await bcrypt.hash(req.body.password, 10);
      const data = await _userAccount.findByIdAndUpdate(
        req.body._id,
        req.body,
        { new: true }
      );

      if (data) {
        response.status = 200;
        response.message = "Data updated successfully!";
        response.data = data;
      } else {
        response.status = 400;
        response.message = "Something Went Wrong!";
      }
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserAcc(req, res) {
    try {
      const response = {};
      const data = await _userAccount.findByIdAndDelete(req.body._id);

      if (data) {
        response.status = 200;
        response.message = "Data deleted successfully!";
        response.data = data;
      } else {
        response.status = 400;
        response.message = "Something Went Wrong!";
      }
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const response = {};
      const data = await _userAccount.findOne({ email: req.body.email });
      if (data) {
        let password = await bcrypt.compare(req.body.password, data.password);
        if (password) {
          const token = await jwt.token({
            _id: data._id,
            name: data.name,
            age: data.age,
            mobileNumber: data.mobileNumber,
            email: data.email,
            password: data.password,
          });
          
          response.status = 200
          response.message = 'Login Successfully!'
          response.token = token
          response.data = data
        } else {
          response.status = 400;
          response.message = "Please enter the correct password!";
        }
      } else {
        response.status = 404;
        response.message = "Email is not registered!";
      }
      res.send(response)
    } catch (error) {
      console.log(error);
    }
  }
}
