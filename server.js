const express = require("express");

const app = express();
const hbs = require("hbs");

app.set(hbs, "view-engine");
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  req.start = Date.now();
  var date = new Date(req.start);

  if (date.getDay() >= 1 && date.getDay() <= 5) {
    if (date.getHours() >= 9 && date.getHours() <= 17) {
      next();
    }
  } else {
    res.end("<h1>ouups...the website is not available!!</h1>");
  }
});
app.get("/", (req, res) => {
  res.render("index.hbs", { pageName: "home" });
});
app.get("/contact", (req, res) => {
  res.render("index.hbs", { pageName: "contact" });
});

app.get("/services", (req, res) => {
  res.render("index.hbs", { pageName: "services" });
});

app.listen("3000", (err) => {
  if (err) {
    console.log("server is not connected");
  }
  console.log("server is running on port 3000");
});
