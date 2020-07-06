const authController = {};
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

authController.login = async (req, res) => {
  res.render('login');
};

authController.register = async (req, res) => {
  res.render('register');
};

authController.create = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (await userModel.findOne({ email })) {
      return res
        .status(400)
        .render('error', { message: 'Email already exist' });
    }

    const user = new userModel({
      password,
      firstname,
      lastname,
      email,
    });

    await user.save();
    return res.redirect('/');
  } catch (error) {
    return res.status(400).render('error', { message: error });
  }
};

authController.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password').lean();
    if (!user)
      return res.status(400).render('error', { message: 'Email dont exist' });
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .render('error', { message: 'Email or password invalid' });
    }

    req.session.userId = user._id;
    return res.redirect('/dashboard');
  } catch (error) {
    return res.status(400).render('error', { message: error });
  }
};

module.exports = authController;
