const Org = require('../models/org');
const moveFile = require('move-file');

const { check, validationResult } = require('express-validator');
exports.store = function(req, res, next) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    Org.create({
      name: req.body.name,
      logo: req.body.logo,
      address: req.body.address,
      website: req.body.website,
      email: req.body.email,
      country: req.body.country,
      csv: req.body.csv,
      skills: req.body.skills,
      questions: req.body.questions,
    }, function (err, org) {
      if (err) {
        console.log('error ----:',err);
        return next(err);
      }

      (async () => {

        try {
          await moveFile('public/temp/'+req.body.logo, 'public/org_logos/'+req.body.logo);
          console.log('The file has been moved');
          res.send({status: 'success', message: 'organization-created-successfully'});
        } catch (e) {
          console.log(e);
        } finally {
          res.send({status: 'failed', message: 'something-wrong-with-filesystem.'});
        }

      })();

    });
}
