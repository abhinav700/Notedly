import mongoose from "mongoose";
export let connect = async () => {
  try {
  
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URI!);

    let connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected Mongo Db successfuly");
    });

    connection.on("error", (err) => {
      console.log("Mongo Db failed to connect");
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong ");
  }
};

connect();
setInterval(() => {
  mongoose.disconnect()
  connect();
}, 6 * 60 * 60);