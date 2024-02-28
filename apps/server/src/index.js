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
  "http://example1.com",
  "http://example2.com",
  process.env.CLIENT_URL,
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
