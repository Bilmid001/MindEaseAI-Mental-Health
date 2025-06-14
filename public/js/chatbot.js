const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const voiceBtn = document.getElementById("voiceBtn");

const API_KEY = "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";

// Conversation history stored here (starting with a system prompt for assistant behavior)
let messages = [
  { role: "system", content: "You are MindEase, a compassionate AI assistant helping users with mental wellness." }
];

// Add message to chat UI
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message-bubble ${sender === "user" ? "user" : "bot"}`;
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Speak the message
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// Get AI Response
async function getAIResponse(userMessage) {
  addMessage("user", userMessage);

  // Add user message to conversation history
  messages.push({ role: "user", content: userMessage });

  // Call OpenAI API with full conversation history
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `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 ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    const data = await response.json();

let aiMessage = data.choices?.[0]?.message?.content.trim();

if (!aiMessage) {
  const fallbackMessages = [
"How are you feeling today?",
"Can you tell me more about how you’re doing?",
"Would you like to share what’s on your mind?",
"Can you describe your mood right now?",
"Could you explain what’s been bothering you?",
"Would you like to talk about your day?",
"Can you tell me if something made you feel better?",
"Would you like help tracking your emotions?",
"Can you share what’s making you feel stressed?",
"Could you tell me about your sleep lately?",
"Would you like to try a breathing exercise together?",
"Can you describe how your energy levels are?",
"Would you like to talk about what’s worrying you?",
"Can you share a positive moment from today?",
"Could you explain what helps you feel calm?",
"Would you like me to remind you to check in later?",
"Can you tell me about any small victories today?",
"Would you like me to connect you with professional care?",
"Can you explain what self-care means to you?",
"Would you like some tips to relax right now?",
"Can you tell me if you’ve been feeling overwhelmed?",
"Would you like to set a goal for your mental health?",
"Can you share what you’re grateful for today?",
"Could you tell me what makes you feel supported?",
"Would you like help creating a calming routine?",
"Can you explain what you need most from me right now?",
"Would you like to talk about any challenges you’re facing?",
"Can you share how you usually cope with stress?",
"Would you like me to suggest some calming music?",
"Can you tell me how I can support you better?"
  ];
  const randomIndex = Math.floor(Math.random() * fallbackMessages.length);
  aiMessage = fallbackMessages[randomIndex];
}


    // Add assistant response to conversation history and UI
    messages.push({ role: "assistant", content: aiMessage });
    addMessage("bot", aiMessage);
    speak(aiMessage);

  } catch (error) {
    console.error("Error fetching AI response:", error);
    addMessage("bot", "Oops! Something went wrong. Please try again later.");
  }
}

// Handle form submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const prompt = userInput.value.trim();
  if (!prompt) return;
  userInput.value = "";
  getAIResponse(prompt);
});

// Voice input
voiceBtn.addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    getAIResponse(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
});

// Logout button
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html";
  });
}
