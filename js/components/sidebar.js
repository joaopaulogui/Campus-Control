// js/components/sidebar.js

const menuItems = [
    { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>', 
        href: 'dashboard.html' 
    },
    { 
        id: 'air-conditioners', 
        label: 'Ar-Condicionado', 
        icon: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path><path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path>', 
        href: 'air-conditioners.html' 
    },
    { 
        id: 'rooms-control', 
        label: 'Controle de Salas', 
        icon: '<path d="M13 4h3a2 2 0 0 1 2 2v14"></path><path d="M2 20h3"></path><path d="M13 20h9"></path><path d="M10 12v.01"></path><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>', 
        href: 'rooms-control.html' 
    },
    { 
        id: 'schedules', 
        label: 'Horários', 
        icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', 
        href: 'schedules.html' 
    },
    {
        id: 'chat', 
        label: 'Chat Interno', 
        icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', 
        href: 'chat.html' 
    },
    { 
        id: 'loans', 
        label: 'Empréstimos', 
        icon: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path>', 
        href: 'loans.html' 
    },
];

function renderSidebar(activePage) {
    const itemsHtml = menuItems.map(item => `
        <a href="${item.href}" class="nav-item text ${item.id === activePage ? 'sidebar-active' : ''}">
            <span class="nav-icon"><svg class="logo-vec nav-logo" viewBox="0 0 24 24">${item.icon}</svg></span>
            <span class="nav-label">${item.label}</span>
        </a>
    `).join('');

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

    document.getElementById('sidebar').innerHTML = html;
}