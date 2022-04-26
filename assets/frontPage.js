const login = document.getElementById("login");
const register = document.getElementById("register");
login.addEventListener("click", clickLogIn);
register.addEventListener("click", clickRegistar);

async function clickLogIn() {
    const username = document.getElementById("uname").value;
    const password = document.getElementById("pword").value;

    const response = await fetch("/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
    
      if (response.status === 200) {
        location.href = `/chatroom?uname=${username}`;
      } else {
        alert("Wrong credentials. Try again!");
      }
}

async function clickRegistar() {
    const username = document.getElementById("uname").value;
    const password = document.getElementById("pword").value;
  
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    if (response.status === 201) {
      location.href = `/chatroom?uname=${username}`;
    } else {
      alert("Invalid username or password!");
    }
}