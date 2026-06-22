function renderHeader() {
    const html = `
        <div class="flex-row header">
            <div class="flex-row search-field" style="gap: 8px; flex: 1;">
                <svg class="logo-vec search-icon" viewBox="0 0 24 24">${getIcon("magnifier")}</svg>
                <input type="text" id="search-header" class="no-border" style="flex: 1; background-color: transparent;" placeholder="Buscar salas, equipamentos...">
            </div>
            <button></button>
            <div>
                <p class="bold small-text no-margin">Carlos Santos</p>
                <p class="light smaller-text no-margin">Coordenador de Infraestrutura</p>
            </div>
        </div>
    `

    document.getElementById('header').innerHTML = html;
}

renderHeader();