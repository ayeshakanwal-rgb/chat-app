const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');

const BOT_NAME = "Bot";

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
messages.forEach(msg => addMessageToDOM(msg));

// Scroll to bottom
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add message to DOM
function addMessageToDOM({text, type, timestamp}) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', type);
  msgDiv.innerHTML = `
    ${text}
    <div class="timestamp">${timestamp}</div>
  `;
  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Format timestamp
function getTimeStamp() {
  const now = new Date();
  return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

// Simple bot responses
function botResponse(userMessage) {
  const responseMap = {
    "hi": "Hello! How can I help you?",
    "hello": "Hi there! How are you?",
    "how are you": "I'm a bot, I feel great!",
    "bye": "Goodbye! Have a nice day!"
  };
  const key = userMessage.toLowerCase();
  return responseMap[key] || "I am not sure how to respond to that.";
}

// Handle form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if(!text) return;

  const timestamp = getTimeStamp();

  // Add user message
  const userMsg = {text, type: 'sent', timestamp};
  messages.push(userMsg);
  addMessageToDOM(userMsg);

  // Bot reply after 500ms
  setTimeout(() => {
    const botMsg = {text: botResponse(text), type: 'received', timestamp: getTimeStamp()};
    messages.push(botMsg);
    addMessageToDOM(botMsg);
    // Save to localStorage
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, 500);

  messageInput.value = '';
  localStorage.setItem('chatMessages', JSON.stringify(messages));
});
