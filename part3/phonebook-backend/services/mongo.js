const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.error("Please provide a password");
  process.exit(1);
}
const password = process.argv[2];
const [name, number] = process.argv.length === 5 ? process.argv.slice(-2) : [];

const url = `mongodb+srv://admin:${password}@phonebook.bkmd5.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url).then(() => console.log("Connected"));

const personSchema = new mongoose.Schema({ name: String, number: String });

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({ name, number });
  Person.create(person).then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    return mongoose.connection.close();
  });
} else {
  Person.find({}).then((response) => {
    console.log("phonebook:");
    console.table(
      response.map((obj) => ({ name: obj.name, number: obj.number }))
    );
    return mongoose.connection.close();
  });
}
