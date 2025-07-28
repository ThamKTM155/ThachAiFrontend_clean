const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// ✅ Địa chỉ backend Flask của anh Thắm (Render)
const BACKEND_URL = "https://thamai-backend-clean-4.onrender.com/chat";

// ✅ Hàm hiển thị tin nhắn lên khung chat
function appendMessage(content, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✅ Hàm xử lý gửi tin nhắn
async function sendMessage() {
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

    if (!response.ok) {
      throw new Error("Phản hồi không hợp lệ từ server.");
    }

    const data = await response.json();

    if (data.reply) {
      appendMessage(data.reply, "bot-message");
    } else {
      appendMessage("Không nhận được phản hồi từ trợ lý.", "bot-message");
    }
  } catch (error) {
    console.error("Lỗi:", error);
    appendMessage("⚠️ Lỗi kết nối đến máy chủ. Hãy kiểm tra backend.", "bot-message");
  }
}

// ✅ Sự kiện khi bấm nút Gửi
sendButton.addEventListener("click", sendMessage);

// ✅ Sự kiện khi nhấn Enter trên bàn phím
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
