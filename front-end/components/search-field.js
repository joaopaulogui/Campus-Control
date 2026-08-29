function renderSearchField(
    id,
    placeholder = "Pesquisar..."
) {
    return `
        <div class="search-field-component">
            <svg class="logo-vec search-icon" viewBox="0 0 24 24">
                ${getIcon("magnifier")}
            </svg>

            <input
                id="${id}"
                class="search-input-component"
                type="text"
                placeholder="${placeholder}"
            >
        </div>
    `;
}