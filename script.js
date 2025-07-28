const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Thay bằng đúng địa chỉ backend Flask của anh
const BACKEND_URL = "https://thamai-backend-clean-4.onrender.com/chat";

function appendMessage(content, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage(message, "user-message");
  userInput.value = "";

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    appendMessage(data.reply, "bot-message");
  } catch (error) {
    appendMessage("Lỗi kết nối đến máy chủ.", "bot-message");
  }
});
