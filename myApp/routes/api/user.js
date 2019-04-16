const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const Article = require('../../models/article');

const storage = multer.diskStorage({
     destination: "./public/images/article-images",
     filename: function (req, file, cb) {
       cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
     }
   });
   const upload = multer({
     storage: storage,
     limits: { fileSize: 1000000 },
   })


router.post('/createArticle', upload.single('picture'), (req, res) => {
  if (!req.body.picture || !req.body.text) {
    return res.json({ success: false, msg: "empty filed " })
  }
  else {
    let article = new Article({
      picture: req.file.filename,
      text: req.body.text,
      author: req.user._id,
    })

    article.save((err, article) => {
      if (err) {
        return res.json({
          success: false,
          msg: "something wrong in adding article \n" + err.message
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

module.exports = router;