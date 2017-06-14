const noble = require("noble");

console.log("Starting to scan...");
noble.startScanning();

noble.on("discover", peripheral =>
  console.log("peripheral discovered", peripheral)
);
