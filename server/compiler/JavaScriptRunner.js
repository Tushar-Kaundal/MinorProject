const { spawn } = require("child_process");

class JavaScriptRunner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    this.defaultfile = "Main.js";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".js") {
      console.log(`${file} is not a javascript file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);

    const executor = spawn("node", argsRun, options);
    executor.stdout.on("data", (output) => {
      console.log(String(output));
      callback("0", String(output)); // 0, no error
    });
    executor.stderr.on("data", (output) => {
      console.log(`stderr: ${String(output)}`);
      callback("2", String(output)); // 2, execution failure
    });
    executor.on("close", (output) => {
      console.log(`stdout: ${output}`);
    });
  }
}

module.exports = JavaScriptRunner;
