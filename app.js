import express from "express";
import expressLayout from "express-ejs-layouts";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayout);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/settings", (req, res) => {
  res.render("settings");
});

app.listen(port, () => {
  console.log("App Listening on Port: 3000");
});

app.use((req, res) => {
  res.send("File Yang anda Cari tidak ditemukan");
});
