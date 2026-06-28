const currentUser = {
    id: 1,
    name: "Carlos Santos",
    role: "Coordenador de Infraestrutura",
    email: "carlos.santos@campuscontrol.com"
};

const notifications = [
    {
        id: 1,
        title: "Novo empréstimo solicitado",
        time: "2 min atrás",
        read: false
    },
    {
        id: 2,
        title: "Sala 204 destrancada",
        time: "15 min atrás",
        read: false
    },
    {
        id: 3,
        title: "Ar-condicionado da Sala 3 desligado",
        time: "1 hora atrás",
        read: true
    }
];

function renderHeader() {
    const header = document.getElementById("header");

    if (!header) return;

    header.classList.add("header");

    const unreadNotifications =
        notifications.filter(n => !n.read).length;

    header.innerHTML = `
        <div class="header-content">
            <div class="header-actions">

                <button
                    id="notifications-button"
                    class="header-button"
                >
                    <svg class="icon-vec" viewBox="0 0 24 24">
                        ${getIcon("notification")}
                    </svg>

                    ${
                        unreadNotifications > 0
                            ? `<span class="notification-dot"></span>`
                            : ""
                    }
                </button>

                <div class="header-divider"></div>

                <button
                    id="profile-button"
                    class="header-profile"
                >
                    <div class="header-profile-info">
                        <p class="header-profile-name">
                            ${currentUser.name}
                        </p>

                        <p class="header-profile-role">
                            ${currentUser.role}
                        </p>
                    </div>

                    <div class="header-avatar">
                        <svg class="logo-vec" viewBox="0 0 24 24">
                            ${getIcon("user")}
                        </svg>
                    </div>
                </button>
            </div>

            <div
                id="notifications-dropdown"
                class="header-dropdown hidden"
            ></div>

            <div
                id="profile-dropdown"
                class="header-dropdown hidden"
            ></div>
        </div>
    `;

    renderNotificationsDropdown();
    renderProfileDropdown();
    registerHeaderEvents();
}

function renderNotificationsDropdown() {
    const dropdown =
        document.getElementById("notifications-dropdown");

    if (!dropdown) return;

    const items = notifications
        .map(notification => `
            <div class="notification-item">
                <p class="notification-title">
                    ${notification.title}
                </p>

                <p class="notification-time">
                    ${notification.time}
                </p>
            </div>
        `)
        .join("");

    dropdown.innerHTML = `
        <div class="dropdown-title">
            Notificações
        </div>

        ${
            notifications.length
                ? items
                : `
                <div class="empty-dropdown">
                    Nenhuma notificação
                </div>
            `
        }
    `;
}

function renderProfileDropdown() {
    const dropdown =
        document.getElementById("profile-dropdown");

    if (!dropdown) return;

    dropdown.innerHTML = `
        <div class="profile-dropdown-header">
            <p class="header-profile-name">
                ${currentUser.name}
            </p>

            <p class="header-profile-role">
                ${currentUser.role}
            </p>

            <p class="notification-time">
                ${currentUser.email}
            </p>
        </div>

        <div class="profile-dropdown-item">
            Meu Perfil
        </div>

        <div class="profile-dropdown-item">
            Configurações
        </div>

        <div
            id="logout-button"
            class="profile-dropdown-item"
        >
            Sair
        </div>
    `;
}

function registerHeaderEvents() {
    const notificationButton =
        document.getElementById("notifications-button");

    const profileButton =
        document.getElementById("profile-button");

    const notificationDropdown =
        document.getElementById("notifications-dropdown");

    const profileDropdown =
        document.getElementById("profile-dropdown");

    notificationButton.addEventListener(
        "click",
        e => {
            e.stopPropagation();

            profileDropdown.classList.add("hidden");

            notificationDropdown.classList.toggle(
                "hidden"
            );
        }
    );

    profileButton.addEventListener(
        "click",
        e => {
            e.stopPropagation();

            notificationDropdown.classList.add(
                "hidden"
            );

            profileDropdown.classList.toggle(
                "hidden"
            );
        }
    );

    document.addEventListener("click", () => {
        notificationDropdown.classList.add("hidden");
        profileDropdown.classList.add("hidden");
    });
}