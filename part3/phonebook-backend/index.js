require("dotenv").config();
const Express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");

const app = Express();

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(Express.json());
app.use(cors());
app.use(Express.static("dist"));

app.get("/info", (req, res) => {
  Person.find({})
    .count()
    .then((data) => {
      const phonebookInfo = `
    <p>The phonebook has info for ${data} people</p>
    <p>${new Date()}</p>
`;
      return res.status(200).send(phonebookInfo).end();
    });
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((data) => res.status(200).send(data).end())
    .catch((err) => {
      console.error("An error occurred: ", err);
      return res.sendStatus(500);
    });
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  Person.find({ id })
    .then((person) => {
      if (person) return res.status(200).json(person);
      return res.sendStatus(404);
    })
    .catch((err) => {
      console.error("An error occurred: ", err);
      return res.sendStatus(500);
    });
});

app.post("/api/persons", (req, res) => {
  const { body } = req;
  if (!body.name || !body.number)
    return res.status(400).json({ error: "Content Missing" });

  const { name, number } = body;

  Person.find({ name: { $regex: `^${name}$`, $options: "i" } })
    .then((data) => {
      if (data) return res.status(400).json({ error: "name must be unique" });
    })
    .then(() => {
      const person = {
        name,
        number,
      };

      Person.create(person).then((response) => res.status(200).json(response));
    })
    .catch((err) => {
      console.error("An error occurred: ", err);
      return res.sendStatus(500);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = data.find((person) => person.id === id);

  if (!person) return res.sendStatus(404);

  data = data.filter((person) => person.id !== id);

  return res.sendStatus(204);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
