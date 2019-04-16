var express = require('express');
var router = express.Router();
const User = require('../../models/user');

router.post('/createUser', (req, res) => {
    if ( !req.body.username || !req.body.pass || req.body.email) {
      return res.json({ success: false, msg: "empty filed" })
    }
    else {
      let user = new User({
        username: req.body.username,
        password: req.body.pass,
        email: req.body.email,
        role: "user",

      })
      user.save((err, user) => {
        if (err) {
          return res.json({
            success: false,
            msg: "something wrong in user sign up \n" + err.message
          })
        }
        res.json({
          success: true,
          user
        })
      })
    }
  })

router.post('/getAllUsers', (req, res)=>{
    User.find({}, (err, users)=>{
        if(err){
            return res.json({
                success: false,
                msg: "something wrong in user creation \n" + err.message
            })
        }
        res.json({
            success: true,
            users
        })
    })
})

module.exports = router;
