document.addEventListener("DOMContentLoaded", (_event) => {
  // Connect to socket.io
  const socket = io(); // automatically tries to connect on same port app was served from
  const username = document.getElementById("uname").innerText;
  const form = document.getElementById("chatForm");
  const messages = document.getElementById("messages");
  const messageToSend = document.getElementById("txt");
  socket.emit("log on", { name: username });
  const appName = "BlooChatApp";
  
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
    writeMessage(msg.user, msg.message, "normal_text", messages);
  });

  socket.on("log on",(usr) => {
    writeMessage(appName, `${usr.name} joined the room`,"green_text",messages);
  });

  socket.on("log off", (usr) => {
    writeMessage(appName, `${usr.name} left the room`, "red_text", messages);
  });

  socket.on("welcome",(welc) => {
    writeMessage(appName,`Welcome ${welc.name}!`, "normal_text", messages);
    if (welc.users) {
      writeMessage(appName,`Online users ${welc.users}`, "normal_text", messages);
    } else {
      writeMessage(
        appName,
        `Unfortunately no one is online at the moment 😔`,
        "normal_text",
        messages
      );
    }
  });
});

function writeMessage(username, msg, text_class, messages) {
  const message = document.createElement("li");
  const user = document.createElement("span");
  const text = document.createElement("span");
  user.className = "user_badge_format";
  text.className = text_class;
  user.innerText = `${username}`;
  text.innerText = `${msg}`;

  message.appendChild(user);
  message.appendChild(text);
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}