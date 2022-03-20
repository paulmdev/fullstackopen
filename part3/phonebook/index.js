const Express = require("express");

const app = Express();

app.use(Express.json());

const data = [
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

app.get("/api/persons", (req, res) => {
  return res.status(200).send(data).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}`)
);
