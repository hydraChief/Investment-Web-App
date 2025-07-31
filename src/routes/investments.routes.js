const router = require('express').Router();
const investmentController = require('../controllers/investments.controllers');

router.post('/add', investmentController.addInvestmentModel);
router.post('/square-off', investmentController.squareOffInvestment);

module.exports = router;