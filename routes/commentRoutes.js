const express = require('express');
const router = express.Router(); 
const {createComment, getAllComments, de1Comment, edit1Comment}= require('../controller/commentController');



router.post('/:id', createComment)

router.get('/allcomment', getAllComments)

router.delete('/comment/:id', de1Comment)

router.put('/editcomment/:id',edit1Comment)





module.exports = router;