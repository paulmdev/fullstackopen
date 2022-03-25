const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to MongoDB Atlas...");

mongoose
  .connect(url)
  .then(() => console.log("Connected to the database!"))
  .catch((error) =>
    console.error("An error occurred when connecting to the database: ", error)
  );

const personSchema = new mongoose.Schema({ name: String, number: String });

personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
