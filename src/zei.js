const isZEIPeripheral = peripheral =>
  peripheral.advertisement.localName === "Timeular ZEI";

// TODO Convert UUID16 to correct value: see https://stackoverflow.com/a/36212021
const SERVICE = {
  Orientation: "c7e70010c84711e681758c89a55d403c" //"0x0010"
};

const CHARACTERISTIC = {
  Accelerometer: "c7e70011c84711e681758c89a55d403c", //"0x0011",
  Position: "c7e70012c84711e681758c89a55d403c", //"0x0012",
  PushButton: "c7e70021c84711e681758c89a55d403c", //"0x0021",
  LED: "c7e70022c84711e681758c89a55d403c" //"0x0022"
};

const POSITION = {
  TIP_UP: 0,
  DOWN_NORTH: 1,
  DOWN_WEST: 2,
  DOWN_SOUTH: 3,
  DOWN_EAST: 4,
  UP_NORTH: 5,
  UP_WEST: 6,
  UP_SOUTH: 7,
  UP_EAST: 8,
  TIP_DOWN: 9
};

const PUSH_TYPE = {
  SHORT: 0,
  LONG: 1
};

const LED_COLOR = {
  RED: 0,
  GREEN: 1,
  BLUE: 2
};

const DURATION = {
  SHORT: 0,
  LONG: 1
};

module.exports = {
  isZEIPeripheral,
  SERVICE,
  CHARACTERISTIC,
  POSITION,
  PUSH_TYPE,
  LED_COLOR,
  DURATION
};
