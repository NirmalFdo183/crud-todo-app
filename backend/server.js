const express = require("express");

const app = express();

const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
const routes = require("./routes");

app.use("/api", routes);

const connectDB = require("./connectDb");

const port = 5000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
  });
};

startServer();
//mongodb+srv://root:123@cluster-a.rtjqkbm.mongodb.net/

//DB_CONNECTION_STRING = mongodb+srv://root:123@cluster-a.rtjqkbm.mongodb.net/task_manager
