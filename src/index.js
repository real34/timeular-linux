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

const onPositionDetected = newPosition => {
  const positionKey = Object.keys(Zei.POSITION).find(
    key => Zei.POSITION[key] == newPosition
  );
  console.log(positionKey);
};

// https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/CoreBluetoothOverview/CoreBluetoothOverview.html#//apple_ref/doc/uid/TP40013257-CH2-SW1
noble.on("discover", peripheral => {
  console.log("peripheral discovered");
  if (!Zei.isZEIPeripheral(peripheral)) {
    return;
  }

  console.log("It's a ZEI°!", peripheral);
  // see https://github.com/sandeepmistry/noble/issues/165
  noble.stopScanning(() => {
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
      peripheral.discoverSomeServicesAndCharacteristics(
        [Zei.SERVICE.Orientation],
        [Zei.CHARACTERISTIC.Position],
        (err, services, characteristics) => {
          if (err) {
            quit(err);
          }

          console.log("Services found:", services);
          console.log("Characteristics found:", characteristics);

          const positionCharacteristic = characteristics.find(
            characteristic =>
              characteristic.uuid === Zei.CHARACTERISTIC.Position
          );

          positionCharacteristic.on("data", (data, isNotification) => {
            console.log(
              `${isNotification ? "NEW" : "INITIAL"} POSITION:`,
              data,
              isNotification
            );
            onPositionDetected(data.readUInt8(0));
          });

          positionCharacteristic.subscribe();

          // TODO Cleanup?
          // process.on("exit", () => peripheral.disconnect());
        }
      );
    });
  });
});
