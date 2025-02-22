document.getElementById("login-form").addEventListener("submit", 
    handleLogin);
    function handleLogin(event) {
     event.preventDefault();
     const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;
     // Simulate authentication (you can replace this with a real authentication API)
     if (username === "user" && password === "password") {
     alert("Login successful!");
     window.location.href = "taskPage.html"; // Redirect to the task page
     } else {
     alert("Invalid username or password");
     }
    }