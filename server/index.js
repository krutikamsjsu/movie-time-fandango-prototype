const cluster = require('cluster');
//check if the file is being executed in master mode
if (cluster.isMaster) {
  //index.js to be executed here in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  //child mode, act like a server
  // Connect to mongoDB
  let mongoConnect = require('./models/mongooseConnection');
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cookieSession = require('cookie-session');
  const passport = require('passport');
  const key = require('./config/keys');
  require('./models/User');
  require('./models/Movie');
  require('./services/passport');

  const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 100, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
  mongoose.connect(key.mongoURI, options);

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [key.cookieKey]
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  require('./routes/authRoutes')(app);
  require('./routes/adminRoutes')(app);
  require('./routes/uploadRoutes')(app);
  require('./routes/publicRoutes')(app);
  require('./routes/billingRoutes')(app);
  var admin = require('./routes/admin');
  app.use('/admin',admin);
  var adminGraphRoutes = require('./routes/adminGraphRoutes');
  app.use('/graphs', adminGraphRoutes);
  var adminSqlRoutes = require('./routes/adminSqlRoutes');
  app.use('/adminSqlRoutes', adminSqlRoutes);
  var userRoutes = require('./routes/userRoutes');
  app.use('/userRoutes', userRoutes);
  var movies = require('./routes/movies');
    app.use('/movies', movies);
  var booking = require('./routes/booking');
    app.use('/booking', booking);

  if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets
    //like our main.js file, or main.css file
    app.use(express.static('client/build'));
    //Express will serve up the index.html file
    //if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5011;
  app.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
  });
}
