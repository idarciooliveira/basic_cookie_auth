const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const sessions = require('client-sessions');
const authMiddleware = require('./middleware/auth');
const app = express();

app.use(
  sessions({
    cookieName: 'session',
    secret: 'sdasdansljdnasn',
    duration: 30 * 60 * 1000, //30 min
  })
);

app.use(authMiddleware);

app.set('views', path.join(__dirname, 'views'));

app.engine(
  '.hbs',
  hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/index'));
app.use(require('./routes/auth'));

require('./config/database');

app.listen(3000);
