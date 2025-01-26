const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully");
});

app.post("/uploadMultiple", upload.array("images", 6), (req, res) => {
  // 6 is the maximum number of files that can be uploaded
  console.log(req.files);
  res.send("Files uploaded successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
