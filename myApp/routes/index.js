let express = require('express');
let router = express.Router();
const path = require('path')
const Article = require('../models/article');
const User = require('../models/user');
const auth = require('../tools/authentication.js');
const passport = require('passport');
const ac = require('../tools/ac.js');
const admin = require('./api/admin');
const user = require('./api/user');

//-------------------------------------MongoDB ------------------------------------------//
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/myapp");

//-------------------------------------Multer --------------------------------------------//
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: "./public/images/article-images",
  filename: function (req, file, cb) { cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
})

//----------------------------------------
/* GET home page. */
router.get('/', function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      res.render('index.ejs', {
        msg: err
      });
    }
    console.log(articles)
    res.render('index.ejs', {
      articles
    })
  })
});



router.get('/panel*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../panel/build/') });
});


router.post('/signup', (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.username || !req.body.pass) {
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
         console.log(err.message )
        return res.json({
          success: false,
          msg: "something wrong in user sign up " + err.message
        })
      }
      res.json({
        success: true,
        user
      })
    })
    console.log("user created successfully" + user)
  }
})

router.post('/login', passport.authenticate('local-login'),(req, res) => {
  console.log(req.body.username)
  res.json({
    success: true,
    msg: "you are logged in"
  });
});


router.post('/createAdmin', function (req, res) {
  const user = new User({
    username: "admin",
    password: "admin",
    email:"admin@admin.com",
    role: "admin"
  })
  user.save((err, user) => {
    if (err) {
      return res.json({
        success: false,
        msg: "something wrong in admin creation " + err.message
      })
    }
    res.json({
      success: true,
      user
    })
  })
  console.log("user created successfully" + user)
})


router.post('/createArticle', upload.single("picture"), (req, res) => {
  console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
  if (!req.body.text) {
    return res.json({ success: false, msg: "empty filed " })
  }
  else {
    console.log('oooooooooooooooooooooooooooooooooooooo')
    console.log(req.body.text)
    console.log(req.file.filename)
    console.log(req.user._id)
    console.log('oooooooooooooooooooooooooooooooooooooo')
    let article = new Article({
      text: req.body.text,
      picture:req.file.filename,
      author: req.user._id,
    })


    article.save((err, article) => {
      if (err) {
        console.log(err.message);
        return res.json({
          success: false,
          msg: "something wrong in add article " + err.message
        })
      }
      else {
        res.json({
          success: true,
          article
        })
      }
    })
  }
})

// router.post('/createComment', (req, res) => {
//   var articleId = 0;
//   Article.find({ picture: req.body.artInfo },
//     (err, content) => { 
//       // console.log(content[0]._id)
//       articleId = content[0]._id
//     }
//  )

//   console.log('comment creation')

//   if (!req.body.text || !req.body.user) {
//     return res.json({ success: false, msg: "empty filed " })
//   }
//   else {
//     console.log('oooooooooooooooooooooooooooooooooooooo')
//     console.log(req.body.text)
//     console.log(req.body.user)
//     console.log(articleId)
//     console.log('oooooooooooooooooooooooooooooooooooooo')
//     let comment = new Comment({
//       text: req.body.text,
//       author: req.body.user,
//       artId: articleId,
//     })
//     console.log(comment)

//     comment.save((err, comment) => {
//       if (err) {
//         console.log(err.message);
//         return res.json({
//           success: false,
//           msg: "something wrong in add comment " + err.message
//         })
//       }
//       else {
//         res.json({
//           success: true,
//           comment
//         })
//       }
//     })
//   }
// })

router.post('/allArticles', (req, res) => {
  Article.find({},
    (err, contents) => {
      if (err) {
        return res.json({
          success: false,
          msg: "something wrong " + err.message
        })
      }
      res.json({
        success: true,
        contents
      })
      console.log('hoelllllllllllllllllllllllo')
      console.log(contents)
    })
})

router.post('/myArticles', (req, res) => {
  Article.find({ author: req.user._id },
    (err, content) => {
      if (err) {
        return res.json({
          success: false,
          msg: "something wrong " + err.message
        })
      }
      res.json({
        success: true,
        content
      })
      console.log("my Article is" + content);
    })
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.json({
    msg: "you are logged out"
  });
});



router.post('/whoAmI', (req, res) => {
  User.find({ _id: req.user._id },
    (err, user) => {
      if (err) {
        return res.json({
          success: false,
          msg: "something wrong in get user info\n" + err.message
        })
      }
      res.json({
        success: true,
        user
      })
      console.log(user + "in  whoAmI server")
    })
})





router.use('/api/admin', auth.isLogedIn, ac.roleBaseAccess(['admin']), admin);
router.use('/api/user', auth.isLogedIn, ac.roleBaseAccess(['admin', 'user']), user);
module.exports = router;
