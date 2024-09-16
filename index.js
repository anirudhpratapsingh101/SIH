import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT || 3001;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL connection setup
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Login endpoint
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [name]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      const isValidPassword = await bcrypt.compare(password, storedHashedPassword);
      
      if (isValidPassword) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [name]);

    if (checkResult.rows.length > 0) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [name, hashedPassword]
      );

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server running on http://localhost:${port}");
});