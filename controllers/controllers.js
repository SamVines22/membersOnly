const bcryptjs = require("bcryptjs");
const db = require("../db/queries");
const memberPassword = "I am a member";
const adminPassword = "admin";

function index(req,res,next) {
    console.log(req.user);
    let user;
    if (req.user == undefined){
        user = "";
    }
    else {
        user = req.user.username;
    }
    res.render("index", {user:user});
}


function signup(req,res, next) {
    res.render("signup");
}

async function signupPost(req,res,next) {
    bcryptjs.hash(req.body.password, 10, async(err,hashedPassword)=> {
        if(err){
            return err;
        }
        else {
            try {
            
           await db.newUser(req.body.username, hashedPassword);
           res.redirect("/");
            }
            catch(err) {
                res.send("error!");
            }
        }
    })
   
}

function logout(req,res,next) {
    req.logout((err)=> {
        if (err) {
            return next(err);
        }
        else {
            res.redirect("/");
        }
    });
}

async function messagesGet(req,res,next) {  
    
    const messages = await db.getMessages();
    res.render("messages", {user: req.user, messages: messages});
}

async function messagesPost(req,res,next) {
    const text = req.body.text;
    const id = req.user.id;
    await db.postMessage(id,text);
   
    res.redirect("/messages");
}

async function membersOnlyPost(req,res,next) {
    const text = req.body.text;
    const id = req.user.id;
    await db.postMessage(id,text);
    res.redirect("/membersonly");
}

function members(req,res,next) {
    res.render("memberForm", {user:req.user, message: null});
}

async function membersPost (req,res,next) {
    const id = req.user.id;
    if (req.body.text == memberPassword) 
    {
        await db.addMember(id);
        res.redirect("/membersonly");
    }
    else {
        res.render("memberForm", {user: req.user, message: "incorrect password try again"});
    }
    
}


async function membersOnly(req,res,next) {    
  const messages = await db.getAllMessages();  
  res.render("membersOnlyMessages", {user: req.user, messages:messages});
}

function admin(req,res) {
    res.render("admin", {password: adminPassword, message:null});
}

async function adminPost(req,res) {
    console.log(req.body);
    const id = req.user.id;
    if (req.body.text === adminPassword)
    {
       await db.addAdmin(id);
        res.redirect("/membersOnly");
    }
    else {
        res.render("admin", {password:adminPassword, message: "incorrect password!"});
    }
   
}

async function deletePost(req,res) {
    console.log(req.params);
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/membersOnly");
}


module.exports = {
    index,
    signup,
    signupPost,
    logout,
    messagesGet,
    messagesPost,
    members,
    membersPost,
    membersOnly,
    membersOnlyPost,
    admin,
    adminPost,
    deletePost
}