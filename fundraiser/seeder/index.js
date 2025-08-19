import { users } from './users.js';
import { stories } from './stories.js';
import { donations } from './donations.js';
import mysql from 'mysql';
import md5 from 'md5';

users.forEach(user => {
    user.password = md5('123');
});

let sql;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fundraiser'
});

con.connect(_ => console.log('Prisijungta prie duomenų bazės!'));

con.query('DROP TABLE IF EXISTS donations;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS sessions;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS stories;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS users;'), (err) => {
    if (err) throw err;
}

sql = `
    CREATE TABLE users (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    role enum('admin', 'user') NOT NULL,
    password char(32) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Users created!');
});

sql = `
    CREATE TABLE sessions (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int(10) UNSIGNED NOT NULL,
    token char(32) NOT NULL,
    expires datetime NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table sessions created!');
});

sql = `
    CREATE TABLE stories (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,    
    text text NOT NULL,
    goal_amount decimal(12,2) NOT NULL,    
    collected_amount decimal(12,2) NOT NULL,
    user_id int(10) UNSIGNED NOT NULL,
    approved int(1) NOT NULL,
    image_url varchar(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 `;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Stories created!');
});

sql = `
    CREATE TABLE donations (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    story_id int(10) UNSIGNED DEFAULT NULL,
    donor_name varchar(100) NOT NULL,
    amount decimal(12,2) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 `;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Donations created!');
});

sql = `
    ALTER TABLE stories
    ADD CONSTRAINT stories_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table keys created!');
});

sql = `
    ALTER TABLE donations
    ADD CONSTRAINT donations_ibfk_1 FOREIGN KEY (story_id) REFERENCES stories (id);
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table keys created!');
});

sql = `
    ALTER TABLE sessions
    ADD CONSTRAINT sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table keys created!');
});

sql = `
    INSERT INTO users
    (id, name, password, role )
    VALUES ?
`;

con.query(sql, [users.map(user => [user.id, user.name, user.password, user.role])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Users!');
});


sql = `
    INSERT INTO stories
    (id, title, text, goal_amount, collected_amount, user_id, approved, image_url)
    VALUES ?
`;

con.query(sql, [stories.map(story => [story.id, story.title, story.text, story.goal_amount, story.collected_amount, story.user_id, story.approved, story.image_url])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Stories!');
});


sql = `
    INSERT INTO donations
    (id, story_id, donor_name, amount)
    VALUES ?
`;

con.query(sql, [donations.map(donate => [donate.id, donate.story_id, donate.donor_name, donate.amount])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Donations!');
});

con.end(err => {
    if (err) throw err;
    console.log('Atsijungta nuo duomenų bazės!');
});