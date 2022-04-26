const db = require("./data/db");
const auth = require("./routes/auth.js");
const debug = require("debug")("bloo-chat");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 7000;
db.connect();

const users = [];
app.use(express.json());
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/chatroom", (req, res) => {
  res.render("chatroom.njk", { uname: req.query.uname });
});

io.on("connection", function (socket) {
  let theUser;
  socket.on("log on", (usr) => {
    theUser = usr.name;
    socket.broadcast.emit("log on", { name: theUser});
    socket.emit("welcome", { name: theUser, users: users});
    users.push(theUser);
  });

  socket.on("message", (msg) => {
    debug(`${msg.user}: ${msg.message}`);
    //Broadcast the message to everyone
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("log off", {name: theUser});
    const index = users.indexOf(theUser);
    if (index> -1) {
      users.splice(index,1);
    }
  });
});

http.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
