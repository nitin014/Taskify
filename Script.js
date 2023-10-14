document.addEventListener("DOMContentLoaded", function () {
  const users = [
    { username: "Nitin", password: "password" },
    { username: "Aniket", password: "password" },
    // Add more user objects as needed
  ];

  // Get references to the form and login button
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-button");
  const usernameInput = document.querySelector('input[name="username"]');
  const passwordInput = document.querySelector('input[name="password"]');

  // Add an event listener to the login button
  loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values entered in the username and password fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if both fields are filled out
    if (username.trim() === "" || password.trim() === "") {
      alert(
        "Username and password are compulsory fields. Please fill them out."
      );
    } else {
      // Check if the entered credentials match any user in the user data
      const matchedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
        window.location.href = "task.html";
        //alert("Login successful!"); // Replace with actual login behavior
        // You can add code here to redirect the user or perform other actions after successful login
      } else {
        alert("Invalid username or password. Please try again.");
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here, including event listeners.

  const assignButton = document.getElementById("assign-button");

  assignButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values entered in the task assignment form
    const taskName = document.querySelector('input[name="taskName"]').value;
    const assignee = document.querySelector('input[name="assignee"]').value;
    const dueDate = document.querySelector('input[name="dueDate"]').value;
    const taskDescription = document.querySelector(
      'textarea[name="taskDescription"]'
    ).value;

    // Create a new task list item and add it to the task list
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <strong>Task Name:</strong> ${taskName}<br />
        <strong>Assignee:</strong> ${assignee}<br />
        <strong>Due Date:</strong> ${dueDate}<br />
        <strong>Description:</strong> ${taskDescription}<br />
        <strong>Status:</strong> In Progress
      `;

    // Get the reference to the task list ul element
    const taskList = document.getElementById("task-list");

    // Append the new task item to the task list
    taskList.appendChild(taskItem);

    // Clear the form inputs
    document.querySelector('input[name="taskName"]').value = "";
    document.querySelector('input[name="assignee"]').value = "";
    document.querySelector('input[name="dueDate"]').value = "";
    document.querySelector('textarea[name="taskDescription"]').value = "";
  });
});

// chat.js
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to append a new message to the chat
function appendMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (sender === "user") {
    messageElement.classList.add("user-message");
  } else {
    messageElement.classList.add("other-message");
  }
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  // Scroll to the bottom of the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for sending a message
sendButton.addEventListener("click", () => {
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
    // Send the message to the server or other users
    appendMessage(messageText, "user");
    // You may send the message to the server or handle it using an API or WebSocket
    // Example: socket.emit('message', messageText);
    messageInput.value = "";
  }
});

// Simulate receiving a message (you would replace this with real data)
setTimeout(() => {
  appendMessage("Hello!", "other");
}, 1000);

/*const socket = io();

// Handle form submission (sending chat messages)
const messageForm = document.getElementById("message-form");
messageInput = document.getElementById("message-input");
chatMessages = document.getElementById("chat-messages");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("chatMessage", message);
  messageInput.value = "";
});

// Handle incoming chat messages
socket.on("chatMessage", (message) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
});*/
// Create a Socket.io instance
const socket = io();

// Handle sending messages
messageInput = document.getElementById("message-input");
sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    socket.emit("chatMessage", message); // Send the message to the server
    messageInput.value = "";
  }
});

// Handle receiving messages
chatMessages = document.getElementById("chat-messages");

socket.on("chatMessage", (message) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
});
document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here, including event listeners.

  const assignButton = document.getElementById("assign-button");

  assignButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values entered in the task assignment form
    const taskName = document.querySelector('input[name="taskName"]').value;
    const assignee = document.querySelector('input[name="assignee"]').value;
    const dueDate = document.querySelector('input[name="dueDate"]').value;
    const taskDescription = document.querySelector(
      'textarea[name="taskDescription"]'
    ).value;

    // Create a new task list item and add it to the task list
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <strong>Task Name:</strong> ${taskName}<br />
        <strong>Assignee:</strong> ${assignee}<br />
        <strong>Due Date:</strong> ${dueDate}<br />
        <strong>Description:</strong> ${taskDescription}<br />
        <strong>Status:</strong> In Progress
      `;

    taskItem.classList.add("task"); // Add a class to identify task items

    // Get the reference to the task list ul element
    const taskList = document.getElementById("task-list");

    // Append the new task item to the task list
    taskList.appendChild(taskItem);

    // Clear the form inputs
    document.querySelector('input[name="taskName"]').value = "";
    document.querySelector('input[name="assignee"]').value = "";
    document.querySelector('input[name="dueDate"]').value = "";
    document.querySelector('textarea[name="taskDescription"]').value = "";
  });

  const searchFilterForm = document.getElementById("search-filter-form");

  searchFilterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user-entered search keyword
    const searchKeyword = document
      .getElementById("search-input")
      .value.toLowerCase();

    // Get all task items
    const taskItems = document.querySelectorAll(".task");

    // Loop through task items and hide/show them based on the search keyword
    taskItems.forEach((taskItem) => {
      const taskNameElement = taskItem.querySelector(
        "strong:contains('Task Name:')"
      );

      if (taskNameElement.textContent.toLowerCase().includes(searchKeyword)) {
        taskItem.style.display = "block";
      } else {
        taskItem.style.display = "none";
      }
    });
  });
});
