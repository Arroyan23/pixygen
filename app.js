const express = require("express");
const expressLayout = require("express-ejs-layouts");
const prototype = require("./utils/loader.js");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("style"));
app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.static("obj"));
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
    res.redirect("/settings"); // Redirect ke halaman setelah login sukses
  } else {
    res.redirect("/");
  }
});

// Middleware otentikasi untuk halaman yang butuh akses
const authMiddleware = (req, res, next) => {
  if (name === "fathia" && password === "123456") {
    next(); // Lanjut ke halaman berikutnya
  } else {
    res.redirect("/");
  }
};

app.use(expressLayout);
app.get("/education", (req, res) => {
  res.render("education", { layout: "layouts/main-layout" });
});

app.get("/homepage", (req, res) => {
  res.render("education", {
    layout: "layouts/main-layout.ejs",
    title: "Homepage",
    navbar: "Home",
  });
});

app.get("/settings", authMiddleware, (req, res) => {
  const cariJSON = prototype.loadJSON();
  res.render("settings", {
    layout: "layouts/main-layout.ejs",
    title: "Settings",
    navbar: "Settings JS",
    cariJSON,
  });
});

// buat untuk menerima detail dari tombol yang baru saja di klik
// oleh usernya sendiri

app.get("/settings/:nama", authMiddleware, (req, res) => {
  const ambilLokasi = prototype.detailJSON(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout.ejs",
    title: "Detail Settings",
    navbar: "Detail JS",
    ambilLokasi,
  });
});

app.get("/addprototype", authMiddleware, (req, res) => {
  res.render("addprototype", {
    layout: "layouts/main-layout.ejs",
    title: "Menambahkan Prototype",
    navbar: "Menambahkan Prototype",
  });
});

app.post("/submitpro", (req, res) => {
  const location = req.body.location;
  const address = req.body.adress;
  const id = req.body.protid;

  prototype.addPrototypeJSON(location);
  res.redirect("/success");
});

app.get("/success", authMiddleware, (req, res) => {
  res.render("success", {
    layout: "layouts/main-layout.ejs",
    title: "Success",
    navbar: "Berhasil Ditambahkan",
  });
});

app.listen(port, () => {
  console.log("App Listening on Port: 3000");
});

app.use((req, res) => {
  res.send("File Yang anda Cari tidak ditemukan");
});
