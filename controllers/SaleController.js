import models from "../models";

const addStock = async (idItem, amount) => {
  let { stock } = await models.Item.findOne({
    _id: idItem,
  });
  let newStock = parseInt(stock) + parseInt(amount);
  const reg = await models.Item.findByIdAndUpdate(
    {
      _id: idItem,
    },
    {
      stock: newStock,
    }
  );
};

const reduceStock = async (idItem, amount) => {
  let { stock } = await models.Item.findOne({
    _id: idItem,
  });
  let newStock = parseInt(stock) - parseInt(amount);
  const reg = await models.Item.findByIdAndUpdate(
    {
      _id: idItem,
    },
    {
      stock: newStock,
    }
  );
};

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Sale.create(req.body);
      //Updating stock
      let details = req.body.details;
      details.map((item) => {
        reduceStock(item._id, item.amount);
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error add sale",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Sale.findOne({ _id: req.query._id })
        .populate({
          path: "user",
          select: ["name"],
        })
        .populate({
          path: "person",
          select: ["name"],
        });
      if (!reg) {
        res.status(404).send({
          message: "Not found sale",
        });
      }
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error query sale",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Sale.find({
        $or: [
          {
            proof_num: new RegExp(value, "i"),
          },
          {
            proof_serie: new RegExp(value, "i"),
          },
        ],
      })
        .populate({
          path: "user",
          select: ["name"],
        })
        .populate({
          path: "person",
          select: ["name", "address", "doc_num", "phone", "email"],
        })
        .sort({
          createdAt: -1,
        });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list sale",
      });
      next(error);
    }
  },
  /* update: async (req, res, next) => {
    try {
      const reg = await models.Sale.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          description: req.body.description,
        }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list sale",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Sale.findByIdAndDelete({
        _id: req.body._id,
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list sale",
      });
      next(error);
    }
  }, */
  activate: async (req, res, next) => {
    try {
      const reg = await models.Sale.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 1,
        }
      );
      //Updating stock
      let details = reg.details;
      details.map((item) => {
        reduceStock(item._id, item.amount);
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list sale",
      });
      next(error);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Sale.findByIdAndUpdate(
        { _id: req.body._id },
        {
          state: 0,
        }
      );
      //Updating stock
      let details = reg.details;
      details.map((item) => {
        addStock(item._id, item.amount);
      });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list sale",
      });
      next(error);
    }
  },
  report12Months: async (req, res, next) => {
    try {
      const reg = await models.Sale.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt",
              },
              year: {
                $year: "$createdAt",
              },
            },
            total: {
              $sum: "$total",
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
          },
        },
      ]).limit(12);

      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error report12Months",
      });
      next(error);
    }
  },
  queryDates: async (req, res, next) => {
    try {
      let start = req.query.start;
      let end = req.query.end;
      const reg = await models.Sale.find({
        createdAt: {
          $gte: start,
          $lt: end,
        },
      })
        .populate({
          path: "user",
          select: ["name"],
        })
        .populate({
          path: "person",
          select: ["name"],
        })
        .sort({
          createdAt: -1,
        });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Error list income",
      });
      next(error);
    }
  },
};
