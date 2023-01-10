const express = require('express');
const router = express.Router();

const {createCollege, getCollege} = require('../controllers/collegeController');
const {createIntern} = require('../controllers/internController');

router.post('/functionup/colleges', createCollege);
router.post('/functionup/interns', createIntern);
router.get('/functionup/collegeDetails', getCollege);

router.all('/*', function (req, res) {
    res.status(404).send({status: false, msg: 'page not found'});
});

module.exports = router;