const Express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = Express();

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(Express.json());
app.use(cors());

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const phonebookInfo = `
    <p>The phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
`;
  return res.status(200).send(phonebookInfo).end();
});

app.get("/api/persons", (req, res) => res.status(200).send(data).end());

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = data.find((person) => person.id === Number(id));

  if (person) return res.status(200).json(person);
  return res.sendStatus(404);
});

app.post("/api/persons", (req, res) => {
  const { body } = req;
  if (!body.name || !body.number)
    return res.status(400).json({ error: "Content Missing" });

  const { name, number } = body;

  if (data.some((person) => person.name.toLowerCase() === name.toLowerCase()))
    return res.status(400).json({ error: "name must be unique" });

  const person = {
    name,
    number,
    id: Math.floor(Math.random() * 99999999999999999),
  };

  data.push(person);

  return res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;

  const person = data.find((person) => person.id === id);

  if (!person) return res.sendStatus(404);

  data = data.filter((person) => person.id !== id);

  return res.sendStatus(204);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
