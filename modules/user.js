const bcrypt = require('bcrypt');
const pool = require('../db');

const createUser = async (user) => {
    const {username, password} = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query('insert into userts (username, password) values (?, ?)', [username, hashedPassword]);

    return result.insertId;
};

const findUserByUsername = async (username) => {
    const [rows] = await pool.query('select * from users where username = ?', [username]);
    return rows[0];
};

module.exports = {createUser, findUserByUsername};