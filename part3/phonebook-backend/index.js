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

app.post("/api/persons", async (req, res, next) => {
    const { body } = req;
    if (!body.name || !body.number)
        return res.status(400).json({ error: "Content Missing" });

    const { name, number } = body;

    try {
        const existingPersons = await Person.find({
            name: { $regex: `^${name}$`, $options: "i" },
        });

        console.log(existingPersons);

        if (existingPersons.length) {
            return res.status(400).json({ error: "name must be unique" });
        }

        const person = {
            name,
            number,
        };

        const response = await Person.create(person);
        return res.status(200).json(response);
    } catch (err) {
        next(err);
    }
});

app.delete("/api/persons/:id", (req, res, next) =>
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch((error) => next(error))
);

app.put("/api/persons/:id", (req, res, next) => {
    const { name, number } = req.body;

    const person = { name, number };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((updatedPerson) => res.status(200).json(updatedPerson))
        .catch((error) => next(error));
});

const errorHandler = (error, request, response) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else {
        return response.sendStatus(500);
    }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
