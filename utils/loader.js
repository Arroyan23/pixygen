// untuk load applikasi js dan proses dengan json

// import data untuk di bagian json

const fs = require("fs");

// buat function untuk baca file jsonnya

const loadJSON = () => {
  const readFile = fs.readFileSync("./data/prototype.json");
  const changeJSON = JSON.parse(readFile);
  return changeJSON;
};

// buat fungsi untuk mengambil detail dari prototype

const detailJSON = (location) => {
  const ambilFile = loadJSON();
  const cariFile = ambilFile.find(
    (prototype) => prototype.location === location
  );
  return cariFile;
};

// buat fungsi untuk menambahkan ke file JSON

const addPrototypeJSON = (location) => {
  const ambilFile = loadJSON();
  const buatObject = {
    location: location,
    condition: "Well Organized",
    degrees: "25 Degrees",
    status: "Normal",
  };
  ambilFile.push(buatObject);

  // masukkan ke datanya

  fs.writeFileSync("./data/prototype.json", JSON.stringify(ambilFile));
};

module.exports = {
  loadJSON,
  detailJSON,
  addPrototypeJSON,
};
