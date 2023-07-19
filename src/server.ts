import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connect successfully");
    app.listen(config.port, () => {
      console.log(`Cow-Hut app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("failed to connect database", error);
  }
}

main();
