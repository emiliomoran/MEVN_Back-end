import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Item.create(req.body);
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add item",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Item.findOne({
        _id: req.query._id,
      }).populate({
        path: "category",
        select: ["name"],
      });
      if (!reg) {
        res.status(404).send({
          message: "Not found item",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query item",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Item.find(
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
      )
        .populate({
          path: "category",
          select: ["name"],
        })
        .sort({
          createdAt: -1,
        });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list item",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Item.findByIdAndUpdate(
        { _id: req.body._id },
        {
          category: req.body.categoy,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list item",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Item.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list item",
      });
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Item.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 1,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list item",
      });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Item.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 0,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list item",
      });
      next(error);
    }
  },
};
