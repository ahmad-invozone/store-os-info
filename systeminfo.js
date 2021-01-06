const config = require("dotenv").config().parsed;
const os = require("os");
const fs = require("fs-extra");

// function read data from file
function readData(path) {
  try {
    fs.readFile(path, "utf8", (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
}

// function for writing data in file
function writeData(path, data) {
  return new Promise(function (resolve, reject) {
    // make sure directories and file exists before writing
    fs.ensureFile(path, (err) => {
      if (err) {
        reject(err);
      }
      fs.writeFile(path, data, function (errW) {
        if (errW) {
          reject(errW);
        } else {
          console.log("Write Successfull!");
          resolve();
        }
      });
    });
  });
}

// store cpu information
async function storeCpuInfo() {
  try {
    let data = await os.cpus();
    const fileName = "cpu.txt";
    const path = config.STORAGE_PATH + fileName;
    data = JSON.stringify(data, null, 2);
    writeData(path, data)
      .then(function () {
        // read the data from file
        return readData(path);
      })
      .catch((err) => {
        return console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
}

// call the info store function
storeCpuInfo();
