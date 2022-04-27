document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
  const appName = "BlooChatApp";
  socket.emit("log on", { name: username });
  
  form.addEventListener("submit", (event) => {
    socket.emit("message", {
      user: username,
      message: messageToSend.value,
    });
    messageToSend.value = "";
    event.preventDefault();
  });

  // append the chat text message
  socket.on("message", (msg) => {
    writeMessage(msg.user, msg.message, "text_normal", messages);
  });

  socket.on("log on",(usr) => {
    writeMessage(appName, `${usr.name} joined the room`,"text_green",messages);
  });

  socket.on("log off", (usr) => {
    writeMessage(appName, `${usr.name} left the room`, "text_red", messages);
  });

  socket.on("welcome",(welc) => {
    writeMessage(appName,`Welcome ${welc.name}!`, "text_normal", messages);
    if (welc.users) {
      writeMessage(appName,`Online users ${welc.users}`, "text_normal", messages);
    } else {
      writeMessage(
        appName,
        `Unfortunately no one is online at the moment 😔`,
        "text_normal",
        messages
      );
    }
  });
});

function writeMessage(username,msg,text_class,messages) {
  const message = document.createElement("li");
  const user = document.createElement("span");
  const text = document.createElement("span");
  user.className = "user_badge";
  text.className = text_class;
  user.innerText = `${username}`;
  text.innerText = `${msg}`;

  message.appendChild(user);
  message.appendChild(text);
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}