const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { check, validationResult  } = require('express-validator');
const router = express.Router();
const orgCtrl = require('../controllers/orgCtrl');
/* GET users listing. */
router.post('/', [

	check('name').not().isEmpty().trim().escape(),
	check('logo').not().isEmpty().trim().escape(),
	check('address').not().isEmpty().trim().escape(),
	check('country').not().isEmpty().trim().escape(),
	check('website').not().isEmpty().trim().escape(),
	check('email').isEmail().normalizeEmail()
],orgCtrl.store);




const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/temp/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/uploadLogo', upload.single('file'), function(req, res, next) {
	console.log(req.file);
  res.send({status: 'success', message: 'upload-successful', name: req.file.filename });
});

module.exports = router;
