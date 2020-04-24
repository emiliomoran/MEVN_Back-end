import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose, { mongo } from "mongoose";
import router from "./routes";

//Conection db
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://127.0.0.1:27017/dbsystem";
mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection db successfully on port 27017");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.set("port", process.env.PORT || 3000);

/* app.get("/hello", function (req, res) {
  res.send("Hello World!");
}); */

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
