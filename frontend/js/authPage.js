// this feature is not completed
document.getElementById("login-form").addEventListener("submit",
    handleLogin);
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Simulate authentication (you can replace this with a real authentication API)
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Login Failed:", error);
    }
}