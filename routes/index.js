'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images'),
      {insert,allData,view,mostViewed} = require('../controller/upload')

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
      // link2: req.files.
    })
  })

router.post('/insert', insert)  
router.get('/allData',allData)
router.post('/view', view)  
router.get('/mostViewed',mostViewed)
module.exports = router