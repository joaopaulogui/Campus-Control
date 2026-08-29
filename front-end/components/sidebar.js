// js/components/sidebar.js

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "house",
    href: "../dashboard",
  },
  {
    id: "air-conditioners",
    label: "Ar-Condicionado",
    icon: "air",
    href: "../air-conditioners",
  },
  {
    id: "rooms-control",
    label: "Controle de Salas",
    icon: "closedDoor",
    href: "../rooms-control",
  },
  {
    id: "schedules",
    label: "Horários",
    icon: "clock",
    href: "../schedules",
  },
  {
    id: "chat",
    label: "Chat Interno",
    icon: "chat",
    href: "../chat",
  },
  {
    id: "loans",
    label: "Empréstimos",
    icon: "box",
    href: "../loans",
  },
];

function renderSidebar(activePage) {
  const itemsHtml = menuItems
    .map(
      (item) => `
        <a href="${item.href}" class="nav-item text ${item.id === activePage ? "sidebar-active" : ""}">
            <span class="nav-icon"><svg class="logo-vec nav-logo" viewBox="0 0 24 24">${getIcon(item.icon)}</svg></span>
            <span class="nav-label">${item.label}</span>
        </a>
    `,
    )
    .join("");

  const html = `
        <div class="sidebar-header">
            <div id="sidebar-logo" class="logo green-background">
                <svg id="sidebar-logo-vec" class="logo-vec" viewBox="0 0 24 24">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                    <path d="M10 6h4"></path>
                    <path d="M10 10h4"></path>
                    <path d="M10 14h4"></path>
                    <path d="M10 18h4"></path>
                </svg>
            </div>
            <div>
                <h2 id="sidebar-title" class="large-text no-margin">Campus<br>Control</h2>
                <p id="sidebar-subtitle" class="smaller-text no-margin">Sistema Operacional</p>
            </div>
        </div>
        <nav class="sidebar-nav">
        ${itemsHtml}
        </nav>
        <div id="sidebar-footer">
            <div id="sidebar-support">
                <p id="sidebar-support-text" class="smaller-text">Suporte Técnico</p>
                <button id="sidebar-support-button" class="smaller-text">Contatar TI</button>
            </div>
        </div>
    `;

  document.getElementById("sidebar").innerHTML = html;
}
