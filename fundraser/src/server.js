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

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fundraiser'
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Prisijungta prie duomenų bazės!');
});

// User Registration
app.post('/register', (req, res) => {
    setTimeout(_ => {
        const { name, password } = req.body;
        const role = 'user';

        let sql = `
        SELECT * FROM users
        WHERE name = ?
        `;
        con.query(sql, [name], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            };
            if (result.length > 0) {
                res.status(400).json({ message: 'Username already exists' });
                return;
            }

            sql = `
                INSERT INTO users (name, password, role) 
                VALUES (?, ?, ?)
            `;
            con.query(sql, [name, md5(password), role], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: 'User registered successfully' });
            });
        });
    }, 1000);
});


app.get('/users', (req, res) => {
    setTimeout(_ => {

        const token = req.cookies.token || 'no-token';

        const sql = `
            SELECT users.id, users.name
            FROM sessions
            JOIN users ON sessions.user_id = users.id
            WHERE token = ? 
            AND expires > NOW()
        `;

        con.query(sql, [token], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
                return;
            };

            if (result.length === 0) {
                res.status(200).json({
                    name: 'Guest',
                    role: 'guest',
                    id: 0,
                });
                return;
            };

            // TODO update token expiration time after each request

            res.json(result[0]);
        });
    }, 1000);
});

// User Login
app.post('/login', (req, res) => {
    const { name, password } = req.body;

    let sql = `
        SELECT * FROM users 
        WHERE name = ?
        AND password = ?
        `;

    con.query(sql, [name, md5(password)], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        };

        if (result.length === 0) {
            res.status(401).json({ message: 'Username not found' });
            return;
        };

        const token = md5(uuidv4());

        sql = `
            INSERT INTO sessions (token, user_id, expires)
            VALUES (?, ?, ?)
            `;

        con.query(sql, [token, result[0].id, new Date(Date.now() + 1000 * 60 * 60 * 24)], (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
                return;
            }
        });

        res.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
        res.json({
            success: true,
            user: result[0]
        });

    });
});

app.post('/logout', (req, res) => {

    setTimeout(_ => {
        const token = req.cookies.token || 'no-token';

        const sql = `
        DELETE FROM sessions
        WHERE token = ?
    `;

        con.query(sql, [token], (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
                return;
            };

            res.clearCookie('token');
            res.json({
                name: 'Guest',
                role: 'guest',
                id: 0
            });
        });
    }, 1000);
});

// Create a New Fundraising Story
app.post('/stories', (req, res) => {
    const { title, text, goal_amount, user_id } = req.body;
    const sql = `
        INSERT INTO stories (title, text, image_url, goal_amount, collected_amount, user_id, approved) 
        VALUES (?, ?, 0, ?, 0, ?, 0)
    `;

    con.query(sql, [title, text, goal_amount, user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Story created successfully, pending approval' });
    });
});

// Get All Approved Fundraising Stories
app.get('/stories', (req, res) => {
    const sql = `
        SELECT * FROM stories 
        WHERE approved = 1 
        ORDER BY collected_amount < goal_amount DESC
    `;
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Donate to a Story
app.post('/donate', (req, res) => {

    const { story_id, donor_name, amount } = req.body;

    let sql = `
        INSERT INTO donations (story_id, donor_name, amount) 
        VALUES (?, ?, ?)
    `;

    con.query(sql, [story_id, donor_name, amount], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        };

        sql = `
            UPDATE stories 
            SET collected_amount = collected_amount + ? 
            WHERE id = ?
        `;

        con.query(sql, [amount, story_id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            };
            res.json({ message: 'Donation successful' });
        });
    });
});

// Get pending Fundraising Stories
app.get('/pending', (req, res) => {
    const sql = `
        SELECT * FROM stories 
        WHERE approved = 0 
        ORDER BY collected_amount < goal_amount DESC
    `;
    con.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Admin Approving a Story
app.patch('/approve/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        UPDATE stories 
        SET approved = 1 
        WHERE id = ?
        `;

    con.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Story approved successfully' });
    });
});

app.listen(port, () => {
    console.log(`Fundraserio serveris darbui pasiruošęs ant ${port} porto!`)
});
