// add INSERT query to upload an image
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:Antsuke:postgres@localhost:5432/final-project`
);

// UPLOAD PICTURE // INSERT
module.exports.uploadItem = (item_url, category) => {
    return db.query(
        `INSERT INTO items (item_url, category)
        VALUES ($1, $2) 
        RETURNING *;`,
        [item_url, category]
    );
};

// TO RENDER PICTURES IN WARDROBE // SELECT
module.exports.getWardrobeItems = () => {
    return db.query(`SELECT item_url, category, id FROM items;`);
};

// TO RENDER ONLY A CERTAIN CATEGORY'S ITEMS // SELECT
module.exports.getTops = () => {
    return db.query(
        `SELECT item_url, category, id FROM items WHERE category = 'top';`
    );
};
module.exports.getBottoms = () => {
    return db.query(
        `SELECT item_url, category, id FROM items  WHERE category = 'bottom';`
    );
};
module.exports.getShoes = () => {
    return db.query(
        `SELECT item_url, category, id FROM items WHERE category = 'shoes';`
    );
};
module.exports.getAccessories = () => {
    return db.query(
        `SELECT item_url, category, id FROM items WHERE category = 'accessory';`
    );
};
module.exports.getHats = () => {
    return db.query(
        `SELECT item_url, category, id FROM items WHERE category = 'hat';`
    );
};
