var express = require("express");
var path = require("path");
var app = express();
const fs = require("fs");
const exphbs = require("express-handlebars");
//Setting up the port that the Express.js server will listen on
const port = process.env.port || 3000; 
// Middleware for us to use our staic files that are insiide public
app.use(express.static(path.join(__dirname, "public")));
// Middleware to parse incoming request bodies encoded in URL-encoded format
app.use(express.urlencoded({ extended: true }));
// Configuiring handlebars as the template engine to be used with custom helpers according to questions
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: { 
      matchID: function (val1, val2) {
        if (val1 == val2) return true;
        else return false;
      },
      matchTitle: function (val1, val2) {
        if (val1.toLowerCase().includes(val2.toLowerCase())) return true;
        else return false;
      },
      notZero: function (value) {
        if (value == 0) return false;
        else return true;
      },
      changeZero: function (value) {
        if (value == "0") return "N/A";
        else return value;
      },
    },
  })
);
// Setting Handlebars (hbs) as the view engine for rendering dynamic content.
app.set("view engine", "hbs");

//accessing the json file
fs.readFile("datasetB.json", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  mydata = JSON.parse(data);
});
// Different routes
app.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

app.get("/users", function (req, res) {
  res.send("respond with a resource");
});

app.get("/data", function (req, res) {
  res.render("data", {
    data: mydata,
  });
});

app.get("/search/prID", function (req, res) {
  res.render("asinForm");
});

app.post("/search/prID", function (req, res) {
  let asin = req.body.asin;
  res.render("asinResult", {
    ProductId: asin,
    Json: mydata,
  });
});

app.get("/data/title", function (req, res) {
  res.render("title");
});

app.post("/data/title", function (req, res) {
  let title = req.body.title;
  res.render("titleResult", {
    Title: title,
    Json: mydata,
  });
});

app.get("/allData", function (req, res) {
  res.render("allData", {
    data: mydata,
  });
});

app.get("*", function (req, res) {
  res.render("error", { title: "Error", message: "Wrong Route" });
});
// Listening the port (3000 in here case)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
