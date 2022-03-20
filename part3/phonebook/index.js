import Express from "express";

const app = Express();

app.use(Express.json());

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));