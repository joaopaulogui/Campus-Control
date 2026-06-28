function formatTime(dateString) {
    const date = new Date(dateString);

    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function renderSearchField() {
    document.getElementById("contact-search-field").innerHTML = `
        <div class="search-field chat-search-field">
            <svg class="logo-vec search-icon" viewBox="0 0 24 24">
                ${getIcon("magnifier")}
            </svg>

            <input
                id="contact-search"
                type="text"
                placeholder="Buscar contatos..."
                class="chat-search-input"
            >
        </div>
    `;
}

function renderMessageInput() {
    document.getElementById("message-input-container").innerHTML = `
        <form
            id="message-form"
            class="chat-input-wrapper"
        >
            <input
                id="message-input"
                type="text"
                placeholder="Digite sua mensagem..."
                class="chat-input"
                autocomplete="off"
            >

            <button
                type="submit"
                class="base-button green-background chat-send-button"
            >
                <svg
                    class="logo-vec"
                    viewBox="0 0 24 24"
                >
                    ${getIcon("send")}
                </svg>
            </button>
        </form>
    `;
}

function renderContact(chat, selectedChatId) {
    const activeClass =
        chat.id === selectedChatId
            ? "active-chat"
            : "";

    const statusClass =
        chat.participant.online
            ? "online"
            : "offline";

    return `
        <div
            class="contact-item ${activeClass}"
            data-chat-id="${chat.id}"
        >
            <div class="contact-avatar-wrapper">
                <div class="contact-avatar">
                    <svg
                        class="contact-avatar-icon"
                        viewBox="0 0 24 24"
                    >
                        ${getIcon("user")}
                    </svg>

                    <span
                        class="contact-status ${statusClass}"
                    ></span>
                </div>
            </div>

            <div class="contact-info">
                <p class="contact-name">
                    ${chat.participant.name}
                </p>

                <p class="contact-department">
                    ${chat.participant.department}
                </p>
            </div>

            ${
                chat.unread > 0
                    ? `
                    <div class="contact-unread">
                        ${chat.unread}
                    </div>
                `
                    : ""
            }
        </div>
    `;
}

function renderChatHeader(chat) {
    const status =
        chat.participant.online
            ? "Online"
            : "Offline";

    const statusClass =
        chat.participant.online
            ? "online"
            : "offline";

    return `
        <div class="chat-header-content">
            <div class="contact-avatar">
                <svg
                    class="contact-avatar-icon"
                    viewBox="0 0 24 24"
                >
                    ${getIcon("user")}
                </svg>

                <span
                    class="contact-status ${statusClass}"
                ></span>
            </div>

            <div>
                <p class="chat-header-name">
                    ${chat.participant.name}
                </p>

                <p class="chat-header-status">
                    ${status}
                </p>
            </div>
        </div>
    `;
}

function renderMessage(message, isMine) {
    const sideClass =
        isMine
            ? "message-me"
            : "message-other";

    const bubbleClass =
        isMine
            ? "message-bubble-me"
            : "message-bubble-other";

    return `
        <div class="message ${sideClass}">
            <div class="message-bubble ${bubbleClass}">
                ${message.text}
            </div>

            <span class="message-time">
                ${formatTime(message.createdAt)}
            </span>
        </div>
    `;
}

function renderEmptyChat() {
    return `
        <div class="chat-empty">
            <p class="light text">
                Nenhuma conversa selecionada
            </p>
        </div>
    `;
}