[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7682368&assignment_repo_type=AssignmentRepo)
# Homework 5: Bloo Chat!

A simple realtime messaging application build with Node, Express, and Socket.io.

After cloning the application, run `npm install` to install the dependencies. 

To run the application, use the command `npm run dev`.

Detailed instructions are at this [url](https://cs280spring.github.io/hw/hw5/index.html).

The application is deployed on [Heroku](https://bloo-chat-starter.herokuapp.com/).

The bloo chat is split up between sever and client side.
For the client side we use the script.js file as well as the frontPage.js which are connected to each other. The frontPage.js post request the "/authenticate" and "/registar" for user input and checks if their credentials are acceptable or if they are making a new account (then they need to be added to list of users). After the user either registers or is authenticated the username is sent direct to "/chatroom". When chatroom.njk runs it calls script.js which then uses socket.io to establish a connection and uses io.emit to send messages.
For the server side