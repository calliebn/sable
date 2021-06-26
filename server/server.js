const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const io = require('socket.io')(5000);

io.on('connection', (socket) => {
  // id of user
  const id = socket.handshake.query.id;
  // new ids
  socket.join(id);

  // send message from client through someone else
  // take in recipients and text being sent
  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      //  swap recipeint between sender and receiver
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
