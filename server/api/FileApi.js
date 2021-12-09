const mkdirp = require("mkdirp");
const fs = require("fs");
const getDirName = require("path").dirname;
const path = require("path");

module.exports = {
  getFile(lang, callback) {
    let file = "";
    const language = lang.toLowerCase();
    if (language === "java") {
      file = path.join(__dirname, "../templates", "Main.java");
    } else if (language === "c") {
      file = path.join(__dirname, "../templates", "Main.c");
    } else if (language === "c++") {
      file = path.join(__dirname, "../templates", "Main.cpp");
    } else if (language === "javascript") {
      file = path.join(__dirname, "../templates", "Main.js");
    } else if (language === "python") {
      file = path.join(__dirname, "../templates", "Main.py");
    } else {
      callback("");
      return;
    }
    console.log(`getTemplate:${file}`);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },

  saveFile(file, code, input, callback) {
    // create parent directories if they doesn't exist.
    mkdirp(getDirName(file), (err) => {
      if (err) return callback(err);
      textfile = path.join(getDirName(file), "file.txt");
      if (input !== undefined) {
        fs.writeFile(textfile, input, (err1) => {
          if (err1) {
            throw err1;
          }
        });
      }

      return fs.writeFile(file, code, (err2) => {
        if (err2) {
          throw err2;
        }

        callback();
      });
    });
  },
};
