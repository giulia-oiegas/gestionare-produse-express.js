const pool = require('../db');

const createProduct = async (product) => {
    const {name,price, description} = product;
    const [result] = await pool.query('insert into products (name, price, description) values (?, ?, ?)', [name, price, description]);
    return result.insertId;
};

const getAllProducts = async () => {
    const [rows] = await pool.query('select * from products');
    return rows;
};

const getProductById = async (productId) => {
    const [rows] = await pool.query('select * from products where id = ?', [productId]);
    return rows[0];
};

const updateProduct = async (productId, updatedProduct) => {
    const {name, price, description} = updatedProduct;
    await pool.query('update products set name = ?, price = ?, description = ? where id = ?', [name, price, description, productId]);
    return true;
};

const deleteProduct = async (productId) => {
    await pool.query('delete from products where id = ?', [productId]);
    return true;
};

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};