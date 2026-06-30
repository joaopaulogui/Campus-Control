function renderResume(floorName, rooms) {
  const totalRooms = rooms.length;
  let activeAcs = 0;
  let workingAcs = 0;
  let defectiveAcs = 0;
  let brokenAcs = 0;

  rooms.forEach((room) => {
    if (room.ac.isOn) activeAcs++;

    switch (room.ac.class) {
      case "working":
        workingAcs++;
        break;
      case "warning":
        defectiveAcs++;
        break;
      case "broken":
        brokenAcs++;
        break;
    }
  });

  return `
        <div class="card" style="padding: 24px;">
            <h3 class="bold big-text medium-bottom-margin">${floorName}</h3>
            <div class="flex-row gray-border-bottom small-bottom-margin" style="padding: 0px 0px 24px 0px;">
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">Total de Salas</p>
                    <p class="bold large-text no-margin">${totalRooms}</p>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <p class="light small-text smaller-bottom-margin">ACs Ligados</p>
                    <p class="bold large-text no-margin">${activeAcs}/${totalRooms}</p>
                </div>
            </div>
            <div class="flex-row" style="gap: 16px;">
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    ${chooseIcon("working")}
                    <span class="light small-text">${workingAcs}</span>
                </div>
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    ${chooseIcon("warning")}
                    <span class="light small-text">${defectiveAcs}</span>
                </div>
                <div class="flex-row" style="gap: 8px; align-items: center;">
                    ${chooseIcon("broken")}
                    <span class="light small-text">${brokenAcs}</span>
                </div>
            </div>
        </div>
    `;
}

function chooseIcon(acClass) {
  switch (acClass) {
    case "working":
      return `<svg class="logo-vec working ac-icons-vec" viewBox="0 0 24 24">${getIcon("checkMark")}</svg>`;
    case "warning":
      return `<svg class="logo-vec warning ac-icons-vec" viewBox="0 0 24 24">${getIcon("warning")}</svg>`;
    case "broken":
      return `<svg class="logo-vec broken ac-icons-vec" viewBox="0 0 24 24">${getIcon("x")}</svg>`;
  }
}

function chooseLabel(acClass) {
  switch (acClass) {
    case "working":
      return "Funcionando";
    case "warning":
      return "Com Defeito";
    case "broken":
      return "Quebrado";
  }
}

function renderButtons(item) {
  if (item.ac.isOn) {
    return `
        <button class="bold text base-button on-off-button on flex-row small-bottom-margin" data-toggle-ac="${item.name}">
            <svg class="logo-vec ac-on-off-vec" viewBox="0 0 24 24">${getIcon("power")}</svg>
            Desligar
        </button>
        <div class="flex-row" style="justify-content: space-between; gap: 8px;">
            <button class="base-button bold small-text temp-control-button" data-decrease-temp="${item.name}">- 1°C</button>
            <button class="base-button bold small-text temp-control-button" data-increase-temp="${item.name}">+ 1°C</button>
        </div>
    `;
  }

  return `
        <button class="bold text base-button on-off-button off flex-row" data-toggle-ac="${item.name}">
            <svg class="logo-vec ac-on-off-vec" viewBox="0 0 24 24">${getIcon("power")}</svg>
            Ligar
        </button>
    `;
}

function renderCard(floorName, rooms) {
  const cardsHtml = rooms
    .map((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      if (!matchesSearch) return "";

      return `
        <div class="card ac-card ${item.ac.class}" style="padding: 24px;">
            <div class="flex-row medium-bottom-margin" style="justify-content: space-between;">
                <div>
                    <h3 class="bold bigger-text no-margin">${item.name}</h3>
                    <p class="light small-text no-margin">${floorName}</p>
                </div>
                <div class="logo ac-logo">
                    <svg class="logo-vec ac-logo-vec" viewBox="0 0 24 24">${getIcon("air")}</svg>
                </div>
            </div>
            <div class="status-container medium-bottom-margin">
                <div class="label flex-row ac-status ${item.ac.class}-label" style="padding: 12px; justify-content: space-between;">
                    <div class="label flex-row" style="gap: 8px; align-items: center;">
                        ${chooseIcon(item.ac.class)}
                        <span class="bold small-text ${item.ac.class}">${chooseLabel(item.ac.class)}</span>
                    </div>
                    <svg class="logo-vec ac-config-vec" viewBox="0 0 24 24">${getIcon("cog")}</svg>
                </div>
                <select class="status-select-overlay" data-change-status="${item.name}">
                    <option value="working" ${item.ac.class === "working" ? "selected" : ""}>Funcionando</option>
                    <option value="warning" ${item.ac.class === "warning" ? "selected" : ""}>Com Defeito</option>
                    <option value="broken" ${item.ac.class === "broken" ? "selected" : ""}>Quebrado</option>
                </select>
            </div>
            <div class="flex-row small-bottom-margin" style="gap: 8px; align-items: center;">
                <svg class="logo-vec ac-config-vec" viewBox="0 0 24 24">${getIcon("temperature")}</svg>
                <span class="light small-text">Temperatura</span>
            </div>
            <div class="flex-row small-bottom-margin" style="gap: 4px; align-items: baseline;">
                <span class="bold larger-text">${item.ac.temperature}</span>
                <span class="light big-text">°C</span>
            </div>
            ${renderButtons(item)}
        </div>
      `;
    })
    .join("");

  return `
        <h3 class="bold big-text medium-bottom-margin gray-border-bottom" style="padding: 0px 0px 8px 0px;">${floorName}</h3>
        <div class="grid cards bigger-bottom-margin" style="grid-template-columns: repeat(3, minmax(212px, 1fr));">${cardsHtml}</div>
    `;
}
