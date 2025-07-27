console.log("✅ ThachAI Frontend hoạt động!");

// Gọi tới backend Flask để lấy câu trả lời từ AI
async function getResponseFromBackend(message) {
  try {
    const response = await fetch("https://thamai-backend-clean-2.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("❌ Lỗi khi gọi backend:", error);
    return "Xin lỗi, hệ thống đang gặp sự cố.";
  }
}

// Hàm hiển thị tin nhắn lên khung chat
function showMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerText = message;

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Xử lý khi người dùng bấm nút gửi hoặc Enter
const inputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", handleSend);
inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSend();
  }
});

function handleSend() {
  const userMessage = inputField.value.trim();
  if (userMessage === "") return;

  showMessage(userMessage, "user");
  inputField.value = "";

  getResponseFromBackend(userMessage).then((reply) => {
    showMessage(reply, "assistant");
  });
}
