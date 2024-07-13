const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', async (req, res) => {
  let sum = 0; 
  const show = !req.session.vote;
  const data =await Quiz.find()
  data.forEach((item)=>{
    sum +=item.vote;
  })

  res.render('quiz', { title: 'Quiz', data, show, sum });
});

router.post('/', async (req, res) => {
  try{
    const id =req.body.quiz;
    const data = await Quiz.findOne({_id: id})
    data.vote = data.vote + 1;
    data.save();
    req.session.vote=1;
    res.redirect('/quiz');
  } catch(err)
{
  res.redirect('/quiz');
}
  
  
});




module.exports = router;
