const config = require("dotenv").config().parsed;
const os = require("os");
const fs = require("fs");

// store cpu information
async function storeCpuInfo() {
  try {
    let data = await os.cpus();
    data = JSON.stringify(data, null, 2);
    writeData(config.STORAGE_PATH + "cpu.txt", data).then(function () {
      // read the data from file
      readData(config.STORAGE_PATH + "cpu.txt");
    });
  } catch (e) {
    console.log(e);
  }
}

// function for writing data in file
function writeData(path, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, data, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("Write Successfull!");
        resolve();
      }
    });
  });
}

// function read data from file
function readData(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

// call the info store function
storeCpuInfo();
