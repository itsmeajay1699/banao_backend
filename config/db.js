import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(
      "mongodb+srv://ajayroy03377:asklqwopn@cluster0.1oym5k7.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

export default connectDB;
