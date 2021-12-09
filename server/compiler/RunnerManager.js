const path = require("path");
const FileApi = require("../api/FileApi");
const CppRunner = require("./CppRunner");
const PythonRunner = require("./PythonRunner");
const JavaRunner = require("./JavaRunner");
function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;
    if (lang === "c++") {
      runner = new CppRunner();
    } else if (lang === "python") {
      runner = new PythonRunner();
    } else if (lang === "java") {
      runner = new JavaRunner();
    }
    return runner;
  };
}
module.exports = {
  run(lang, code, input, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    const directory = path.join(__dirname, "temp");
    const file = path.join(directory, runner.defaultFile());
    console.log(`file: ${file}`);
    const filename = path.parse(file).name;
    const extension = path.parse(file).ext;
    console.log(`filename: ${filename}`);
    console.log(`extension: ${extension}`);

    FileApi.saveFile(file, code, input, () => {
      runner.run(file, directory, filename, extension, (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
  },
};
