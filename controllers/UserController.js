import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.User.create(req.body);
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add user",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Not found user",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query user",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.User.find(
        {
          $or: [
            {
              name: new RegExp(value, "i"),
            },
            {
              email: new RegExp(value, "i"),
            },
          ],
        },
        { createdAt: 0 }
      ).sort({
        createdAt: -1,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let pass = req.body.password;
      const reg0 = await models.User.findOne({
        _id: req.body._id,
      });
      console.log("pass", pass);
      console.log("reg0.password", reg0.password);
      if (pass != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          rol: req.body.rol,
          name: req.body.name,
          doc_type: req.body.doc_type,
          doc_num: req.body.doc_num,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user",
      });
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 1,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user",
      });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 0,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list user",
      });
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      //console.log("email", )
      let user = await models.User.findOne({
        email: req.body.email,
        state: 1,
      });
      //console.log("user", user);
      if (user) {
        //Exist user
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id);
          res.status(200).json({
            user,
            tokenReturn,
          });
          //res.json("Correct password");
        } else {
          res.status(404).send({
            message: "Incorrect password",
          });
        }
      } else {
        res.status(404).send({
          message: "User not found",
        });
      }
    } catch (error) {}
  },
};
