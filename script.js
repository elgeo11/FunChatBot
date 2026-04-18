const chatBox = document.getElementById("chatBox");
const buttons = document.querySelectorAll("button[data-answer]");
const input = document.getElementById("userInput");
const askBtn = document.getElementById("askBtn");

/* Normalize text */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    //.replace(/\s+/g, ""); //space insensitive
}

/* Add message bubble */

function addMessage(text, sender) {

  const msg = document.createElement("div");

  msg.classList.add("message", sender);

  msg.textContent = text;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;

}

/* Button answers */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const question = btn.textContent;
    const answer = btn.dataset.answer;
    addMessage(question, "user");
    addMessage(answer, "bot");
  });
});

/* Input answers */
askBtn.addEventListener("click", () => {
  const rawText = input.value;
  if (!rawText.trim()) return;
  const text = normalizeText(rawText);
  addMessage(rawText, "user");
  let reply;
  if (text.includes("admin")) {
    reply = "🔒 Secret Mode!";
  } else if (text.includes("μαμα")) {
    reply = "Πήγαινε να φας!";
  } else if (text.includes("chatgpt")) {
    reply = "Εγώ είμαι καλύτερο από το chat gpt";
  } else {
    reply = "Δεν ξέρω 🤔";
  }
  // Show typing animation

const typingMsg = document.createElement("div");

typingMsg.classList.add("message", "bot", "typing");

typingMsg.innerHTML = `
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
`;

chatBox.appendChild(typingMsg);

chatBox.scrollTop = chatBox.scrollHeight;

// Delay before reply

setTimeout(() => {

  typingMsg.remove();

  addMessage(reply, "bot");

}, 900);
  input.value = "";
});

// Enter = send message
// Shift + Enter = new line

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    askBtn.click();
  }
});