const { spawn, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

class PythonRunner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    this.defaultfile = "Main.py";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".py") {
      console.log(`${file} is not a python file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const textfile = path.join(directory, "file.txt");
    const data = fs.readFileSync(textfile, "utf8");
    if (data.length > 0) {
      const child = spawnSync("cat", ["file.txt"], options);
      options.input = child.stdout.toString();
    }
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);
    const executor = spawnSync("python", argsRun, options);
    if (executor.status === 0) {
      console.log(executor.stdout.toString());
      callback("0", executor.stdout.toString());
    } else {
      var regex = /temp\\([\s\S]*)/;
      var match = regex.exec(executor.stderr.toString());
      console.log(`stderr: ${match[1]}`);
      callback("2", match[1]);
    }
  }
}

module.exports = PythonRunner;
