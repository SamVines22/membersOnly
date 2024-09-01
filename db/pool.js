const {Pool} = require("pg");
console.log(Pool);
require("dotenv").config();
const user = process.env.USER;
const pw = process.env.DATABASE_PASSWORD;

module.exports = new Pool({
    host: "localhost",
    user: user,
    database: "members",
    password:pw,
    port: 5432

});