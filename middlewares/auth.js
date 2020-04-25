import tokenService from "../services/token";

export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.rol === "Admin" ||
      response.rol === "Seller" ||
      response.rol === "Grocer"
    ) {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol === "Admin") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyGrocer: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol === "Grocer" || response.rol === "Admin") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifySeller: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "Token not found",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol === "Admin" || response.rol === "Seller") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
};
