const mongoose = require("mongoose");

const connectToDB = async () => {
  const connectionString = process.env.CONNECTION_STRING;
  if (!connectionString) {
    console.error("Connection_string is not defined");
    // normal exit 0
    // unnormal exit 1 2 3 ...
    process.exit(1);
  }

  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error(error);
    process.exit(2);
  });
  db.on("connected", () => {
    console.log("DB CONNECTED");
  });
  db.on("disconnected", () => {
    console.log("DB DISCONNECTED");
  });

  return mongoose.connect(connectionString);
};

module.exports = connectToDB;
