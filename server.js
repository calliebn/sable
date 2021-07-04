const express = require('express');
let session = require('express-session');

// SOCKET.IO
const socketio = require('socket.io');
const http = require('http');
const session = require('express-session');
var RedisStore = require('connect-redis')(session);

//Connect back-end to front-end
//Avoid ignoring requests(sockets)
const cors = require('cors');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./server/users.js');

const PORT = process.env.PORT || 5000;
const router = require('./server/router');

const server = http.createServer(app);
const io = socketio(server);

const sessionMiddleware = session({
  store: new RedisStore({}), // XXX redis server config
  secret: 'keyboard cat',
});
// Express session middleware as a Socket.IO middleware
sio.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(router);
app.use(cors());
app.use(sessionMiddleware);

app.get('/', function (req, res) {
  req.session; // Session object in a normal request
});

// SOCKET.IO INPUTS
io.on('connection', (socket) => {
  // Calls a callBack function with 2 parameters -> name, room (access back-end)
  socket.on('join', ({ name, room }, callback) => {
    //addUser function - return 2 properties i.e. error or user
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    //Emit an event from the back-end to the front-end
    //Welcomes user to chat
    //   Admin generated ones are 'message'
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, Welcome to the the room ${user.room}`,
    });

    //Broadcast - sends a message to everyone besides that specific user
    //Lets everyone except user know that they joined
    socket.broadcast
      .to(user.room)
      //
      .emit('message', { user: 'admin', text: `${user.name}, has joined!` });
    socket.join(user.room);

    //Emit to the room that the user belongs to.
    //Pass in user.room to get the users in that room
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  //Gets an event from the front-end. Front-end emits the msg, back-end receives it
  //   User generated are 'sendMessage'
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    //When the user leaves, new message to roomData
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    //Remove user when they disconnect
    const user = removeUser(socket.id);
    //Message that user has left
    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// MONGO
let MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// let numExpectedSources = 2;
const mongoose = require('mongoose');
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Define API routes here
app.use(routes);

// Connect to Mongo DB
let store = new MongoDBStore({
  uri: process.env.MONGODB_URI || 'mongodb://localhost/yarndb',
  collection: 'mysession',
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(
  require('express-session')({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //cookie valid for 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yarndb",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// )

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
