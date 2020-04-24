import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Category.create(req.body);
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add category",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Category.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Not found category",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query category",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Category.find(
        {
          $or: [
            {
              name: new RegExp(value, "i"),
            },
            {
              description: new RegExp(value, "i"),
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
        message: "Error list category",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          description: req.body.description,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list category",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list category",
      });
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 1,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list category",
      });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 0,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list category",
      });
      next(error);
    }
  },
};
