// IT USES TO RUN THE API ACCORDING TO THE URL PATH 

const express = require("express");
const router = express.Router();
const controller = require("../controller/controllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST route to upload a file
router.post(
  "/upload",
  upload.single("file"),
  controller.uploadFile.bind(controller)
);

// GET route to retrieve the file as JSON data
router.get("/get-file", controller.getFile.bind(controller));

module.exports = router;
