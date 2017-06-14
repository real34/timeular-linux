const noble = require("noble");
const Zei = require("./zei");

console.log("Welcome in Timeular Linux!");
noble.on("stateChange", state => {
  if (state === "poweredOn") {
    console.log("Starting to scan...");
    noble.startScanning();
  } else {
    console.log("Stopping to scan...");
    noble.stopScanning();
  }
});

const quit = message => {
  console.error("Quitting: ", message);
  process.exit(0);
};

// https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/CoreBluetoothOverview/CoreBluetoothOverview.html#//apple_ref/doc/uid/TP40013257-CH2-SW1
noble.on("discover", peripheral => {
  console.log("peripheral discovered");
  if (!Zei.isZEIPeripheral(peripheral)) {
    return;
  }

  console.log("It's a ZEI°!", peripheral);
  noble.stopScanning(); // see https://github.com/sandeepmistry/noble/issues/165

  console.log("Connecting to", peripheral.id);
  peripheral.on("disconnect", () => quit("disconnected"));
  peripheral.connect(err => {
    console.log("Connected", err);
    if (err) {
      quit(err);
    }

    console.log(
      "Discovering all services and characteristices of",
      peripheral.id
    );
    peripheral.discoverAllServicesAndCharacteristics(
      (err, services, characteristics) => {
        if (err) {
          quit(err);
        }

        console.log("Services found:", services);
        console.log("Characteristics found:", characteristics);

        quit("TODO Do something now!");
      }
    );
  });
});
