import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Person.create(req.body);
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add person",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Person.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Not found person",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query person",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
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
        message: "Error list person",
      });
      next(error);
    }
  },
  listCustomers: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            {
              name: new RegExp(value, "i"),
            },
            {
              email: new RegExp(value, "i"),
            },
          ],
          person_type: "Customer",
        },
        { createdAt: 0 }
      ).sort({
        createdAt: -1,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
  listProviders: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Person.find(
        {
          $or: [
            {
              name: new RegExp(value, "i"),
            },
            {
              email: new RegExp(value, "i"),
            },
          ],
          person_type: "Provider",
        },
        { createdAt: 0 }
      ).sort({
        createdAt: -1,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          person_type: req.body.person_type,
          name: req.body.name,
          doc_type: req.body.doc_type,
          doc_num: req.body.doc_num,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 1,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 0,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list person",
      });
      next(error);
    }
  },
};
