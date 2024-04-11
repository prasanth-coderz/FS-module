// FILE SYTEM OF CREATION  LOGIC CODE HAPPENS HERE...

const fs = require("fs");
const path = require("path");

class Controller {
  constructor() {
 }

  uploadFile(req, res) {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const sourcePath = uploadedFile.path;
    const targetPath = path.join(
      __dirname,
      "..",
      "uploads",
      "uploaded-data.json"
    );

    this.writeFileFromUploadedFile(sourcePath, targetPath, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error writing JSON file" });
      }

      res.json({
        message: "File uploaded and saved as JSON successfully",
        file: uploadedFile,
      });
    });
  }

  getFile(req, res) {
    const fileName = "uploaded-data.json";
    const filePath = path.join(__dirname, "..", "uploads", fileName);

    if (fs.existsSync(filePath)) {
      this.readJsonFile(filePath, (err, jsonData) => {
        if (err) {
          return res.status(500).json({ message: "Error reading JSON file" });
        }
        res.json(jsonData);
      });
    } else {
      const sourceFile = path.join(__dirname, "..", "data.json");
      this.copyFile(sourceFile, filePath, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error copying file" });
        }
        this.readJsonFile(filePath, (readErr, jsonData) => {
          if (readErr) {
            return res.status(500).json({ message: "Error reading JSON file" });
          }
          res.json(jsonData);
        });
      });
    }
  }

  readJsonFile(filePath, cb) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, JSON.parse(data));
    });
  }

  copyFile(source, target, cb) {
    let cbCalled = false;

    const rd = fs.createReadStream(source);
    rd.on("error", (err) => done(err, null));
    const wr = fs.createWriteStream(target);
    wr.on("error", (err) => done(err, null));
    wr.on("close", (ex) => done(null, true));
    rd.pipe(wr);

    function done(err, result) {
      if (!cbCalled) {
        cb(err, result);
        cbCalled = true;
      }
    }
  }

  writeFileFromUploadedFile(sourcePath, targetPath, cb) {
    fs.readFile(sourcePath, "utf8", (err, data) => {
      if (err) {
        return cb(err, null);
      }

      fs.writeFile(targetPath, data, cb);
    });
  }
}

module.exports = new Controller();
