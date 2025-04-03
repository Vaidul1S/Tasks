import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();

const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors());


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fundraising_db'
});

// db.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL');
// });

// // User Registration
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
//     db.query(sql, [username, hashedPassword], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'User registered successfully' });
//     });
// });

// // User Login
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = "SELECT * FROM users WHERE username = ?";
//     db.query(sql, [username], async (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) return res.status(401).json({ message: 'User not found' });
        
//         const user = result[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        
//         const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     });
// });

// // Create a New Fundraising Story
// app.post('/stories', (req, res) => {
//     const { title, description, image, goal_amount, user_id } = req.body;
//     const sql = "INSERT INTO stories (title, description, image, goal_amount, collected_amount, user_id, approved) VALUES (?, ?, ?, ?, 0, ?, 0)";
//     db.query(sql, [title, description, image, goal_amount, user_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'Story created successfully, pending approval' });
//     });
// });

// // Get All Approved Fundraising Stories
// app.get('/stories', (req, res) => {
//     const sql = "SELECT * FROM stories WHERE approved = 1 ORDER BY collected_amount < goal_amount DESC";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.json(results);
//     });
// });

// // Donate to a Story
// app.post('/donate', (req, res) => {
//     const { story_id, donor_name, amount } = req.body;
//     const sql = "INSERT INTO donations (story_id, donor_name, amount) VALUES (?, ?, ?)";
//     db.query(sql, [story_id, donor_name, amount], (err, result) => {
//         if (err) return res.status(500).json(err);
        
//         // Update collected amount in the story
//         const updateSql = "UPDATE stories SET collected_amount = collected_amount + ? WHERE id = ?";
//         db.query(updateSql, [amount, story_id], (updateErr, updateResult) => {
//             if (updateErr) return res.status(500).json(updateErr);
//             res.json({ message: 'Donation successful' });
//         });
//     });
// });

// // Admin Approving a Story
// app.put('/stories/approve/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = "UPDATE stories SET approved = 1 WHERE id = ?";
//     db.query(sql, [id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'Story approved successfully' });
//     });
// });

// Start server
app.listen(port, () => {
    console.log(`Fundraserio serveris darbui pasiruošęs ant ${port} porto!`)
});
