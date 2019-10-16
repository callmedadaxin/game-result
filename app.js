const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const port = 3002;
const proxy = require("http-proxy-middleware");

app.set("views", path.join(__dirname, "./build"));
app.engine("html", ejs.__express);
app.set("view engine", "html");
app.use("/static", express.static(path.join(__dirname, "./build/static")));

app.use(
  "/game/*",
  proxy({
    target: "http://117.50.107.7:80",
    changeOrigin: true
  })
);

app.get("/", (req, res) => res.render("index.html"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
