console.log("ThachAI Frontend hoạt động!");

// Gửi yêu cầu tới backend Flask để lấy câu trả lời
async function getResponseFromBackend(message) {
  try {
    const response = await fetch("https://thamai-backend-chuan.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Lỗi khi gọi backend:", error);
    return "Xin lỗi, hệ thống đang gặp sự cố.";
  }
}

// Ví dụ: gửi thử một câu
getResponseFromBackend("Xin chào!").then(reply => {
  console.log("Phản hồi từ backend:", reply);
});
