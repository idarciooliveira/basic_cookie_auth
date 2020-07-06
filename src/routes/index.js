const router = require('express').Router();
const indexController = require('../controllers/index');
const loginRequired = require('../middleware/loginRequired');

router.get('/', indexController.index);
router.get('/dashboard', loginRequired, indexController.dashboard);
router.get('/profile', loginRequired, indexController.profile);

module.exports = router;
