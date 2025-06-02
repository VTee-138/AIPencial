
    const toggleButton = document.getElementById("modelToggle");
    const modelOptions = document.getElementById("modelOptions");

    toggleButton.addEventListener("mousedown", (e) => {
      e.stopPropagation(); // ✅ ngăn lan ra ngoài
      modelOptions.classList.toggle("show");
    });
    // Chọn model
  function selectModel(name, iconUrl) {
      // Cập nhật model hiển thị trong combobox
      const modelSpan = document.getElementById("selectedModel");
      modelSpan.innerHTML = `<img src="${iconUrl}" /> ${name}`;
      document.getElementById("ai-model").value = name;
      modelOptions.classList.remove("show");

      // Cập nhật tiêu đề "Trò chuyện với ..."
      const titleSpan = document.querySelector("#chatTitle .highlight");
      if (titleSpan) {
        titleSpan.textContent = name;
      }

      // Xoá nội dung chat cũ
      const chatBody = document.getElementById("chat-body");
      chatBody.innerHTML = "";
    }

        // Đóng dropdown khi click ra ngoài
        window.addEventListener("click", function (e) {
          if (!e.target.closest(".model-dropdown")) {
              modelOptions.classList.remove("show");
          }
      });

    // Gửi tin nhắn
    function sendMessage() {
      const input = document.getElementById("chatInput");
      const msg = input.value.trim();
      const model = document.getElementById("ai-model").value;

      if (msg) {
        const chatBody = document.getElementById("chat-body");

        const bubble = document.createElement("div");
        bubble.className = "chat-message user";
        bubble.textContent = msg;
        chatBody.appendChild(bubble);
        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

       // Chèn tin nhắn đang gõ
        const aiBubble = document.createElement("div");
        aiBubble.className = "chat-message bot";
        aiBubble.innerHTML = `
  <span class="typing">
    <span>.</span><span>.</span><span>.</span>
  </span>
`;
        chatBody.appendChild(aiBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Gửi yêu cầu tới n8n
        fetch("https://n8n.aipencil.ai/webhook/model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: model, message: msg })
        })
        .then(res => res.json())
        .then(data => {
          aiBubble.innerHTML = data.reply || "Không có phản hồi!";
          chatBody.scrollTop = chatBody.scrollHeight;
        })
        .catch(err => {
          aiBubble.textContent = "Lỗi gửi yêu cầu!";
          chatBody.scrollTop = chatBody.scrollHeight;
        });

      }
    }

    // Gửi bằng Enter
    document.getElementById("chatInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    function sendDefaultMessage() {
      const chatBody = document.getElementById("chat-body");
      chatBody.innerHTML = "";
      const defaultText = "Làm mới cuộc trò chuyện"; // 👈 Bạn có thể thay đổi nội dung
      document.getElementById("chatInput").value = defaultText;
      sendMessage();
}
