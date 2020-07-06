const router = require('express').Router();
const authController = require('../controllers/auth');

router.get('/login', authController.login);
router.post('/login', authController.signIn);

router.get('/register', authController.register);
router.post('/register', authController.create);

module.exports = router;
