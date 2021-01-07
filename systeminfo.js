const config = require('dotenv').config().parsed;
const os = require('os');
const fs = require('fs-extra');

// function read data from file
async function readData(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// function for writing data in file
async function writeData(path, data) {
  try {
    // make sure directories and file exists before writing
    await fs.ensureFile(path);
    await fs.writeFile(path, data);
    console.log('Write Successfull!');
  } catch (error) {
    console.log(error);
  }
}

// store cpu information
async function storeCpuInfo() {
  try {
    let data = os.cpus();
    const fileName = 'cpu.txt';
    const path = os.homedir + config.STORAGE_PATH + fileName;
    data = JSON.stringify(data, null, 2);
    await writeData(path, data);
    readData(path);
  } catch (e) {
    console.log(e);
  }
}

// call the info store function
storeCpuInfo();
