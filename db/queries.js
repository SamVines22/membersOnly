const pool = require("./pool");

async function newUser(username, hashPw) {
   
    await pool.query("INSERT INTO users (username, password, member, admin) VALUES ($1, $2, $3, $4)", [username, hashPw, false, false]);
}

async function getMessages() {
    const {rows} = await pool.query("SELECT * FROM messages ORDER BY time DESC LIMIT 5 ");
    return rows;
}

async function getAllMessages() {
    const {rows} = await pool.query("SELECT users.username, messages.id, messages.text, messages.time FROM users JOIN messages ON users.id = messages.user_id ORDER BY time DESC");
    return rows;
}

async function addMember(id) {

    await pool.query("UPDATE users SET member = $1 WHERE id = $2", [true ,id]);
  
}

async function postMessage(id, text) {

    await pool.query("INSERT INTO messages (user_id, text, time) VALUES ($1,$2, NOW())",[id, text]);
}

async function addAdmin(id) {
    await pool.query("UPDATE users SET admin = $1 WHERE id = $2", [true, id]);
}

async function deleteMessage(id) 
{
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
    newUser,
    getMessages,
    getAllMessages,
    postMessage,
    addMember,
    addAdmin,
    deleteMessage
}