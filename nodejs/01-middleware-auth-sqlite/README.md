# High Scores API 🎮

A backend implementation of a game leaderboard system. It demonstrates how to use Express Middleware to authenticate users against a SQLite database and manage persistent game sessions.

## Features

- **User Creation:** Register new players directly into the database.
- **Middleware Auth:** Custom authentication that intercepts requests to verify Player IDs.
- **Persistent Scoring:** Updates high scores in `database.db` only if the new score is higher than the previous record.
- **Leaderboard:** Retreives the top 10 players.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### 1. Create a Player

Registers a new player and returns their unique ID.

- **Method:** `GET` (For testing ease)
- **URL:** `/create-player?name=YOUR_NAME`
- **Example:**
  ```bash
  curl "http://localhost:3000/create-player?name=Yassen"
  ```

### 2. Submit Score (Protected)

Updates the player's high score. Requires the Player ID to be valid.

- **Method:** `GET`
- **URL:** `/game?player-id=ID&score=NUMBER`
- **Example:**
  ```bash
  # Returns 200 OK if ID exists, 401 Unauthorized if missing
  curl "http://localhost:3000/game?player-id=1&score=500"
  ```

### 3. View Leaderboard

- **Method:** `GET`
- **URL:** `/leaderboard`

## Technical Notes

### Middleware Logic

The `authenticatePlayer` function serves as the gatekeeper.

1. Intercepts the request.
2. Extracts `player-id` from the query parameters.
3. Queries SQLite to find the row.
4. If found: Attaches the full player object to `req.player` and calls `next()`.
5. If missing: Halts the request with `401 Unauthorized`.
