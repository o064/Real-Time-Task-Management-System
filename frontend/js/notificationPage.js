// this feature is not completed

document.getElementById("refresh-btn").addEventListener("click",
    refreshNotifications);
function refreshNotifications() {
    const notificationList = document.getElementById("notification-list");
    // Simulate fetching data (could be from WebSocket or API)
    const notifications = [
        "New task assigned",
        "Your task is due soon",
        "You have a new message",
    ];
    notificationList.innerHTML = ""; // Clear existing notifications
    notifications.forEach(notification => {
        const listItem = document.createElement("li");
        listItem.textContent = notification;
        notificationList.appendChild(listItem);
    });
}
