const express = require("express");
const sqlite = require("sqlite3");

const app = express();
const port = 3000;
const db = new sqlite.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS highscores (
    playerid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER    
)`);

app.use(express.json());
app.get("/create-player", (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).json({ error: "Name is required" });

  const sql = "INSERT INTO highscores (name, score) VALUES (?, ?)";
  db.run(sql, [name, 0], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(`Player ID: ${this.lastID}`);
  });
});

app.get("/game", authenticatePlayer, (req, res) => {
  const score = req.query.score;
  const player = req.player;

  if (!score) return res.status(400).json({ error: "Score is required" });
  if (isNaN(score)) return res.status(400).json({ error: "Invalid score" });

  console.log(`Player ${player} scored ${score}`);
  if (score > player.score) updatePlayerScore(player, score);

  res
    .status(200)
    .send(`Hello ${player.name}! Your current highscore is ${player.score}.`);
});

app.get("/leaderboard", (req, res) => {
  const sql = "SELECT * FROM highscores ORDER BY score DESC LIMIT 10";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function authenticatePlayer(req, res, next) {
  const playerID = req.query["player-id"];

  if (!playerID) return res.status(401).json({ error: "Unauthorized" });
  if (isNaN(playerID))
    return res.status(400).json({ error: "Invalid player ID" });

  const sql = "SELECT * FROM highscores WHERE playerid = ?";
  db.get(sql, [playerID], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) req.player = row;
    else return res.status(404).json({ error: "Player not found" });

    next();
  });
}

function updatePlayerScore(player, score) {
  player.score = score;
  const sql = "UPDATE highscores SET score = ? WHERE playerid = ?";
  db.run(sql, [player.score, player.playerid], (err) => {
    if (err) console.error(err.message);
    console.log(`Player ${player.name} updated score to ${player.score}`);
  });
}
