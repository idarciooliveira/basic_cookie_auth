const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/basicAuthCookie', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected');
  })
  .catch((err) => {
    if (err) console.log('Error on connected database');
  });
