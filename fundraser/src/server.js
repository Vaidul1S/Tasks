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
    database: 'fundraising'
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Prisijungta prie duomenų bazės!');
});

// // User Registration
app.post('/register', (req, res) => {
    setTimeout(_ => {
        const { name, password } = req.body;
        const hashedPassword = md5(password);
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
            con.query(sql, [name, hashedPassword, role], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: 'User registered successfully' });
            });
        });
    }, 1000);
});

// // User Login
// app.get('/users', (req, res) => {
//     setTimeout(_ => {

//         const sql = `
//             SELECT * FROM users        
//     `;

//         con.query(sql, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).json({ error: err.message });
//                 return;
//             }

//             if (result.length === 0) {
//                 res.status(200).json({
//                     name: 'Guest',
//                     role: 'guest',
//                     id: 0,
//                 });
//                 return;
//             }

//             res.json(result[0]);
//         });
//     }, 2000);
// });
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = "SELECT * FROM users WHERE username = ?";
//     con.query(sql, [username], async (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) return res.status(401).json({ message: 'User not found' });

//         const user = result[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     });
// });

// Create a New Fundraising Story
app.post('/stories', (req, res) => {
    const { title, text, image_url, goal_amount, user_id } = req.body;
    const sql = `
        INSERT INTO stories (title, text, image_url, goal_amount, collected_amount, user_id, approved) 
        VALUES (?, ?, ?, ?, 0, ?, 0)
    `;

    con.query(sql, [title, text, image_url, goal_amount, user_id], (err, result) => {
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
    const sql = `
        INSERT INTO donations (story_id, donor_name, amount) 
        VALUES (?, ?, ?)
    `;
    con.query(sql, [story_id, donor_name, amount], (err, result) => {
        if (err) return res.status(500).json(err);

        const sql = `
            UPDATE stories 
            SET collected_amount = collected_amount + ? 
            WHERE id = ?
        `;
        con.query(sql, [amount, story_id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Donation successful' });
        });
    });
});

// // Admin Approving a Story
// app.put('/stories/approve/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = "UPDATE stories SET approved = 1 WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: 'Story approved successfully' });
//     });
// });

app.listen(port, () => {
    console.log(`Fundraserio serveris darbui pasiruošęs ant ${port} porto!`)
});
