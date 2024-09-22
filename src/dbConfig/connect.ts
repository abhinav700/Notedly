import mongoose from "mongoose";
export let connect = async () => {
  try {
    setInterval(() => {
      mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URI!);
    }, 5 * 60 * 60 * 1000);

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
