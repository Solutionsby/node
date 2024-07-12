const express = require('express');
const News = require('../models/news')
const router = express.Router();

router.all('*', (req, res, next)=>{
  if(!req.session.admin){
    res.redirect('/login')
    return;
  }
  next();
})


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const data = await News.find();

    res.render('admin/index', { title: 'Admin', data });
  } catch (err) {
    res.render('admin/index', { title: 'Admin', data: [], error: err.message });
  }
});

router.get('/news/add',(req,res) =>{
  res.render('admin/news-form', {title:'Dodaj news', body:{}, errors:{} })
});
  

router.post('/news/add', async (req, res) => {
  const body = req.body;

  const newsData = new News(body);
  const errors = newsData.validateSync();

  if (errors) {
    res.render('admin/news-form', { title: 'Dodaj news', errors, body });
    return;
  }

  await newsData.save();
   res.redirect('/admin')
  
});

router.get('/news/delete/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin?error=delete_failed');
  }
});



module.exports = router;
