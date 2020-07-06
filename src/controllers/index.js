const indexController = {};

indexController.index = (req, res) => {
  res.render('index');
};

indexController.dashboard = (req, res, next) => {
  res.render('dashboard');
};

indexController.profile = async (req, res) => {
  res.render('profile');
};

indexController.logout = async (req, res) => {
  res.redirect('/login');
};

module.exports = indexController;
