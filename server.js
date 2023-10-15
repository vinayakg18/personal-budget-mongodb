const mongoose = require("mongoose");
const Budget = require("./endpoints/budgetData");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/budget", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/personal_budget", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to the Database");
      Budget.find({})
        .then((data) => {
          res.json(data);
          console.log(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.error(connectionError);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/addItem", (req, res) => {

  mongoose.connect("mongodb://127.0.0.1:27017/personal_budget", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to the database");
      console.log(req.body);

      const newItem = new Budget(req.body);

      Budget.create(newItem)
        .then((data) => {
          res.json(data);
          console.log(data);
        })
        .catch((saveError) => {
          console.error(saveError);
          res.status(400).json({ error: 'Internal Server error - Failed to save item' });
        })
        .finally(() => {
          mongoose.connection.close();
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: 'Internal Server error - Database connection failed' });
    });
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});