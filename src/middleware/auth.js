const usermodel = require('../models/user');

// carrega as informacoes do usuario a cada requiscao
module.exports = (req, res, next) => {
  if (!(req.session && req.session.userId)) {
    return next();
  }
  usermodel
    .findById(req.session.userId, (err, user) => {
      if (err) return next(err);
      if (!user) return next();
      user.password = undefined;
      req.user = user;
      res.locals.user = user;
      next();
    })
    .lean();
};
