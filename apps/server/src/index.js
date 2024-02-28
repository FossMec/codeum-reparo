const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const port = process.env.PORT || 3001;
const connectDatabase = require("./db/Database");
const ErrorHandler = require("./middleware/error");
dotenv.config();

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://codeum-reparo-web.vercel.app"
  process.env.CLIENT_URL,
];
var corsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log(process.env.CLIENT_URL);
app.use(cors(corsOptions));

app.use(ErrorHandler);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDatabase();

const user = require("./controller/user");
const product = require("./controller/product");

//routes
app.use("/api/v2/user", user);
app.use("/api/v2/product", product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
