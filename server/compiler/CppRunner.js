const { spawn, spawnSync } = require("child_process");

const path = require("path");
const fs = require("fs");

class CppRunner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    this.defaultfile = "Main.cpp";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".cpp") {
      console.log(`${file} is not a cpp file.`);
      return;
    }
    this.compile(directory, filename, callback);
  }

  compile(directory, filename, callback) {
    const options = { cwd: directory };

    const argsCompile = [];
    argsCompile[0] = "-o";
    argsCompile[1] = filename;
    argsCompile[2] = "Main.cpp";
    const compiler = spawn("g++", argsCompile, options);
    compiler.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on("data", (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback("1", String(data)); // 1, compile error
    });
    compiler.on("close", (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, callback);
      }
    });
  }

  // execute the compiled file
  execute(directory, filename, options, callback) {
    const textfile = path.join(directory, "file.txt");
    const cmdRun = filename;

    // const executor = spawn('./Hello.out', [], options);
    const data = fs.readFileSync(textfile, "utf8");
    if (data.length > 0) {
      const child = spawnSync("cat", ["file.txt"], options);
      options.input = child.stdout.toString();
    }

    const executor = spawnSync(cmdRun, [], options);
    if (executor.status === 0) {
      console.log(executor.stdout.toString());
      callback("0", executor.stdout.toString());
    } else {
      console.log(`stderr: ${String(child.stderr)}`);
      callback("2", String(child.stderr));
    }
  }
}

module.exports = CppRunner;
