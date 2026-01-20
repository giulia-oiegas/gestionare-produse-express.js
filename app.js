const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db');
const routes = require('./routes/index'); // importare rute

const app = express();
const PORT = process.env.PORT || 3000;

//configurare ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true})); //pt a citi datele din forms

//configurare sesiune
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//configurare passport (auth)
app.use(passport.initialize());
app.use(passport.session());

//strategia de logare (verificare user in bd)
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const [rows] = await pool.query('select * from users where username = ?', [username]);
        const user = rows[0];

        if(!user) {
            return done(null, false, { message: 'Incorrect username.'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.'});
        }

        return done(null, user);
    } catch(error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query('select * from users where id = ?', [id]);
        done(null, rows[0]);
    } catch(error) {
        done(error);
    }
});

//folosirea rutelor
app.use('/', routes);

app.get('/edit-product/:id', async (req, res) => {
    // Implementați logica pentru editare și afișați pagina corespunzătoare

});
// Adăugăm o rută pentru ștergere produs
app.get('/delete-product/:id', async (req, res) => {
    // Implementați logica pentru ștergere și afișați pagina corespunzătoare
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});