const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const firebase = require("./firebase/firebase");
const bodyParser = require("body-parser");

const firebaseRoutes = require('./routes/firebase');
const userRoutes = require('./routes/user');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
