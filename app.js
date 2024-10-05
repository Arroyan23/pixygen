import express from "express";
import expressLayout from "express-ejs-layouts";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static('style'));
app.use(express.static("public"));
app.use(express.static('img'));
app.use(express.static('obj'));
app.use(express.urlencoded({ extended: true }));

let name = "";
let password = "";

app.get("/", (req, res) => {
  res.render("login"); // views/login.ejs
});

// Route untuk menerima input form dan otentikasi user
app.post("/submit", (req, res) => {
  name = req.body.name;
  password = req.body.password;

  if (name === "fathia" && password === "123456") {
    res.redirect("/homepage"); // Redirect ke halaman setelah login sukses
  } else {
    res.status(401).send("User Autentikasi Tidak ditemukan");
  }
});

// Middleware otentikasi untuk halaman yang butuh akses
const authMiddleware = (req, res, next) => {
  if (name === "fathia" && password === "123456") {
    next(); // Lanjut ke halaman berikutnya
  } else {
    res.status(401).send("User Autentikasi Tidak ditemukan");
  }
};

app.use(expressLayout);
app.get("/education", (req, res) => {
  res.render("education", { layout: "layouts/main-layout" });
});

app.get("/homepage", authMiddleware, (req, res) => {
  res.render("education", {
    layout: "layouts/main-layout.ejs",
    title: "Homepage",
    navbar: "Home",
  });
});

app.get('/settings' ,(req, res) => {
  res.render('settings', {layout: 'layouts/main-layout.ejs', title: 'Settings', navbar: 'Settings JS'});
});



app.listen(port, () => {
  console.log("App Listening on Port: 3000");
});

app.use((req, res) => {
  res.send("File Yang anda Cari tidak ditemukan");
});
