const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controllers');

router.get('/amount', dashboardController.getDashboardAmountData);
router.get('/units', dashboardController.getDashboardCountData);

module.exports = router;