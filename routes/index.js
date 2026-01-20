const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const pool = require('../db');
const router = express.Router();

//middleware de protectie - nu lasa userii nelogati sa aiba acces la produse
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}

//rute publice
router.get('/', (req, res) => res.render('index', {user: req.user}));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    try {
        const { username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('insert into users (username, password) values (?, ?)', [username, hashedPassword]);
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('register', { error: 'Eroare la inregistrare.'});
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/manage-products',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if(err) { return next(err); }
        res.redirect('/');
    });
});

//crud produse - rute protejate

//1. read - citire prod
router.get('/manage-products', isLoggedIn, async (req, res) => {
    try {
        const [userRows] = await pool.query('select * from  users');
        const users = userRows;

        const [productRows] = await pool.query('select * from products');
        const products = productRows;

        res.render('manage-products', {users, products});
    } catch(error) {
        res.status(500).send('Eroare la fetch-ul produselor.');
    }
});

// 2. create - add produs
router.get('/add-product', isLoggedIn, (req, res) => res.render('add-product'));

router.post('/add-product', isLoggedIn, async (req, res) => {
    try {
        const {name, price, description} = req.body;
        await pool.query('insert into products (name, price, description) values (?, ?, ?)', [name, price, description]);
        res.redirect('/manage-products');
    } catch(error) { res.status(500).send('Eroare la adaugarea produsului.')};
});

// 3. update - editare produs
router.get('/edit-product/:id', isLoggedIn, async (req, res) => {
    const [rows] = await pool.query('select * from products where id = ?', [req.params.id]);
    res.render('edit-product', {product: rows[0]});
});

router.post('/edit-product/:id', isLoggedIn, async (req, res) => {
    const { name, price, description} = req.body;
    await pool.query('update products set name = ?, price = ?, description = ? where id = ?', [ name, price, description, req.params.id]);
    res.redirect('/manage-products');
});

// 4. delete - stergere produs
// Ștergere produs - afișare pagina de confirmare
router.get('/delete-product/:id', isLoggedIn, async (req, res) => {
    const productId = req.params.id;
    try {
        const [productRows] = await pool.query('select * from products where id = ?', [productId]);
        const product = productRows[0];
        res.render('delete-product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Eroare la fetch-ul descrierii produselor.');
    }
});

// Ștergere produs - procesare ștergere
router.post('/delete-product/:id', isLoggedIn, async (req, res) => {
    const productId = req.params.id;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [productId]);
        res.redirect('/manage-products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Eroare la stergerea produsului.');
    }
});


module.exports = router;