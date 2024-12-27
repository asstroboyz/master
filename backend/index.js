import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 5128;
// Middleware
app.use(cors());
app.use(express.json());
// Database Connection
const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});
db.connect((err) => {
 if (err) {
 console.error('Database connection failed:', err.message);
 } else {
 console.log('Connected to database');
 }
});
// Routes
app.get('/users', (req, res) => {
 db.query('SELECT * FROM users', (err, results) => {
 if (err) return res.status(500).json({ error: err.message });
 res.json(results);
 });
});
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, name, email });
});
});
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));