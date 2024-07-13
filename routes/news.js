const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/',async (req, res) => {
  try{
    const search = req.query.search;
    if(search){
      const data = await News
      .find({title:new RegExp(search, 'i')})
      .sort({date:-1})
      res.render('news', { title: 'News' , data, search});
    }
    const data = await News
    .find()
    .sort({date:-1})
    res.render('news', { title: 'News' , data, search});
  }catch (err) {
    res.render('news', { title: 'News' });

  }
});




module.exports = router;
