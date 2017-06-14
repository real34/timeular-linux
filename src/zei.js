const isZEIPeripheral = peripheral =>
  peripheral.advertisement.localName === "Timeular ZEI";

module.exports = {
  isZEIPeripheral
};
