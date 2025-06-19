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
      "I’m here for you. Take a moment to check in with yourself and share what’s on your mind.",
    
      "Can you tell me more about how you’re doing?",
      "Absolutely. You can be open here there’s no judgment, just support.",
    
      "Would you like to share what’s on your mind?",
      "I’m listening. Whatever you’re going through, you don’t have to go through it alone.",
    
      "Can you describe your mood right now?",
      "Try putting it into a word or phrase. Naming emotions helps us understand them better.",
    
      "Could you explain what’s been bothering you?",
      "You can share as much or as little as you like. Let’s work through it together.",
    
      "Would you like to talk about your day?",
      "Yes, I’d love to hear about your day. What stood out — good or bad?",
    
      "Can you tell me if something made you feel better?",
      "That’s great to notice. Let’s find more moments like that together.",
    
      "Would you like help tracking your emotions?",
      "Sure! Let’s keep track of how you're feeling to help you understand patterns and triggers.",
    
      "Can you share what’s making you feel stressed?",
      "Take a breath and let it out. What’s been weighing on you lately?",
    
      "Could you tell me about your sleep lately?",
      "Sleep affects everything. How many hours are you getting, and how rested do you feel?",
    
      "Would you like to try a breathing exercise together?",
      "Let’s do it. Inhale slowly... hold... exhale. Let’s try a few more together.",
    
      "Can you describe how your energy levels are?",
      "Energy can say a lot about how we’re feeling. High, low, somewhere in between?",
    
      "Would you like to talk about what’s worrying you?",
      "Of course. Talking about it can ease the burden. I’m here for you.",
    
      "Can you share a positive moment from today?",
      "Even small joys matter. What’s something good that happened, even just a little thing?",
    
      "Could you explain what helps you feel calm?",
      "That’s a great insight to have. Let’s remember those calm tools for tough times.",
    
      "Would you like me to remind you to check in later?",
      "Absolutely. I can remind you to take a moment for yourself anytime you need.",
    
      "Can you tell me about any small victories today?",
      "Every step counts. What’s something you did today that made you feel proud?",
    
      "Would you like me to connect you with professional care?",
      "Yes, I can help guide you. Talking to a mental health professional is a strong step.",
    
      "Can you explain what self-care means to you?",
      "Self-care is personal. It can be rest, reflection, or doing something you love. What works for you?",
    
      "Would you like some tips to relax right now?",
      "Sure! Try slow breathing, gentle stretching, or listening to calming music.",
    
      "Can you tell me if you’ve been feeling overwhelmed?",
      "It’s okay to feel that way. Let’s break things down together and find calm.",
    
      "Would you like to set a goal for your mental health?",
      "That’s a great idea. Let’s start with something small, simple, and meaningful.",
    
      "Can you share what you’re grateful for today?",
      "Gratitude helps shift our focus. What’s one thing you feel thankful for right now?",
    
      "Could you tell me what makes you feel supported?",
      "Support can come from people, routines, or even words. What helps you feel safe and heard?",
    
      "Would you like help creating a calming routine?",
      "Yes, let’s build a simple routine to bring peace to your day or night.",
    
      "Can you explain what you need most from me right now?",
      "You can ask for encouragement, ideas, or just space to talk. I’m here for you.",
    
      "Would you like to talk about any challenges you’re facing?",
      "Of course. Sometimes naming a challenge is the first step to overcoming it.",
    
      "Can you share how you usually cope with stress?",
      "Understanding your coping habits is important. Let’s explore what’s helping or what’s not.",
    
      "Would you like me to suggest some calming music?",
      "Yes! I can share some peaceful tracks to help you relax and recharge.",
    
      "Can you tell me how I can support you better?",
      "Just by being here, I’m here to listen and walk with you. Let me know what you need."    
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
