const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const connectDatabase = require("./db/Database");
const ErrorHandler = require("./middleware/error");
dotenv.config();

const app = express();

let corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDatabase();

const user = require("./controller/user");
app.use("/api/v2/user", user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
