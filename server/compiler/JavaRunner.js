const { spawn, spawnSync } = require("child_process");

const path = require("path");
const fs = require("fs");

class JavaRunner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    this.defaultfile = "Main.java";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".java") {
      console.log(`${file} is not a java file.`);
    }
    this.compile(file, directory, filename, callback);
  }

  // compile java source file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    // var compiler = spawn('javac', ['CodeJava.java']);
    const argsCompile = [];
    argsCompile[0] = "Main.java";
    const compiler = spawn("javac", argsCompile, options);
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

  // execute the compiled class file
  execute(directory, filename, options, callback) {
    const argsRun = [];
    argsRun[0] = filename;
    const textfile = path.join(directory, "file.txt");
    const data = fs.readFileSync(textfile, "utf8");
    if (data.length > 0) {
      const child = spawnSync("cat", ["file.txt"], options);
      options.input = child.stdout.toString();
    }
    const executor = spawnSync("java", argsRun, options);
    if (executor.status === 0) {
      console.log(executor.stdout.toString());
      callback("0", executor.stdout.toString());
    } else {
      console.log(`stderr: ${String(child.stderr)}`);
      callback("2", String(child.stderr));
    }
  }
}

module.exports = JavaRunner;
