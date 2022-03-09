const express = require("express");
const User = require("../models/User");
const crypto = require("crypto");

const router = express.Router();

// router.get("/login", (req, res) => {
//     return res.render("login");
// });

router.get("/logout", (req, res) => {
    res.cookie("auth", "goodbye", { maxAge: 0, signed: true });
    return res.json({
        status : 1
    });
});

// router.get("/register", (req, res) => {
//     return res.render("register");
// })

router.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) return res.json({status:0, message: "invalid parameters" });

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ status : 2, message: "User does not exist." });
    }

    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    if (user.password != hashedPassword) {
        return res.json({ status : 3, message: "Invalid Password" });
    }

    res.cookie("auth", req.body.email, { signed: true, maxAge: 1000 * 60 * 60 * 48 });
 
    return res.json({status : 1})
    
})


router.post("/register", async (req, res) => {
    if (!req.body.email || !req.body.password|| !req.body.username)  return res.json({status:0, message: "invalid parameters" });

    let user = await User.findOne({ email: req.body.email });
    if (user)  return res.json({status:2, message: "user already exists!" });

    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    user = new User({
        email: req.body.email,
        password: hashedPassword,
        username : req.body.username,
        });
    try {
        await user.save();  
    } catch (e) {
        console.log(e);
        return res.json({status:2, message: "database error" });
    }
    res.cookie("auth", req.body.email, { signed: true, maxAge: 1000 * 60 * 60 * 48 });
      return res.json({status:1, message: "success" });
})

module.exports = router;