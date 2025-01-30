const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

// Export the superheroes array so tests can access it
const superheroes = [];
app.locals.superheroes = superheroes;

const validateSuperhero = (req, res, next) => {
  const { name, superpower, humilityScore } = req.body;

  if (!name || !superpower || humilityScore === undefined) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  if (isNaN(humilityScore) || humilityScore < 1 || humilityScore > 10) {
    res.status(400).json({ error: "Humility score must be between 1 and 10" });
    return;
  }

  next();
};

app.post("/superheroes", validateSuperhero, (req, res) => {
  const { name, superpower, humilityScore } = req.body;
  const newHero = {
    id: uuidv4(),
    name,
    superpower,
    humilityScore: Number(humilityScore),
  };

  superheroes.push(newHero);
  res.status(201).json(newHero);
});

app.get("/superheroes", (req, res) => {
  const sortedHeroes = [...superheroes].sort(
    (a, b) => b.humilityScore - a.humilityScore
  );
  res.json(sortedHeroes);
});

//Exposed for testing
app.get("superheroes", () => superheroes);

module.exports = app;
