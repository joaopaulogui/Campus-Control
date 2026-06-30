const CURRENT_USER_ID = "ME";

let chats = getChats();
let selectedChatId = chats.length > 0 ? chats[0].id : null;
let searchTerm = "";

function getSelectedChat() {
  return chats.find((chat) => chat.id === selectedChatId);
}

function getFilteredChats() {
  if (!searchTerm) return chats;

  const search = searchTerm.toLowerCase();
  return chats.filter(
    (chat) =>
      chat.participant.name.toLowerCase().includes(search) ||
      chat.participant.department.toLowerCase().includes(search),
  );
}

function renderPage() {
  renderSearchField();
  renderMessageInput();
  renderContacts();
  renderChat();
}

function renderContacts() {
  const contacts = getFilteredChats();
  document.getElementById("chat-contacts").innerHTML = contacts
    .map((chat) => renderContact(chat, selectedChatId))
    .join("");
}

function renderChat() {
  const selectedChat = getSelectedChat();

  if (!selectedChat) {
    document.getElementById("chat-header").innerHTML = renderEmptyChat();
    document.getElementById("chat-messages").innerHTML = "";
    return;
  }

  document.getElementById("chat-header").innerHTML =
    renderChatHeader(selectedChat);
  document.getElementById("chat-messages").innerHTML = selectedChat.messages
    .map((message) =>
      renderMessage(message, message.senderId === CURRENT_USER_ID),
    )
    .join("");

  scrollMessagesToBottom();
}

function selectChat(chatId) {
  selectedChatId = chatId;

  const chat = getSelectedChat();
  if (chat) {
    chat.unread = 0;
    saveChats(chats);
  }

  renderContacts();
  renderChat();
}

function handleSearch(event) {
  searchTerm = event.target.value;
  renderContacts();
}

function handleMessageSubmit(event) {
  event.preventDefault();

  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return;

  const chat = getSelectedChat();
  if (!chat) return;

  chat.messages.push({
    id: crypto.randomUUID(),
    senderId: CURRENT_USER_ID,
    text,
    createdAt: new Date().toISOString(),
  });

  saveChats(chats);
  input.value = "";
  renderChat();
}

function scrollMessagesToBottom() {
  const messages = document.getElementById("chat-messages");
  if (!messages) return;
  messages.scrollTop = messages.scrollHeight;
}

document.addEventListener("click", (event) => {
  const contact = event.target.closest("[data-chat-id]");
  if (contact) selectChat(contact.dataset.chatId);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "contact-search") handleSearch(event);
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "message-form") handleMessageSubmit(event);
});

renderPage();
