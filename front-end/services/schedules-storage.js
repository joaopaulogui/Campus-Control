const SCHEDULES_KEY = "schedules";

const defaultSchedules = {
  thisWeek: [
    {
      room: "Sala 2",
      floor: "Térreo",
      day: "Segunda",
      startHour: 10,
      endHour: 12,
      title: "Cálculo Diferencial e Integral 2",
    },
    {
      room: "Sala 3",
      floor: "Térreo",
      day: "Terça",
      startHour: 8,
      endHour: 10,
      title: "Software em Tempo Real",
    },
    {
      room: "Sala 11",
      floor: "1º Andar",
      day: "Terça",
      startHour: 13.5,
      endHour: 15.5,
      title: "Tecnologias Web",
    },
    {
      room: "Sala 2",
      floor: "Térreo",
      day: "Quarta",
      startHour: 10,
      endHour: 12,
      title: "Cálculo Diferencial e Integral 2",
    },
    {
      room: "Sala 11",
      floor: "1º Andar",
      day: "Quinta",
      startHour: 13.5,
      endHour: 15.5,
      title: "Tecnologias Web",
    },
    {
      room: "Sala 3",
      floor: "Térreo",
      day: "Sexta",
      startHour: 8,
      endHour: 10,
      title: "Software em Tempo Real",
    },
  ],
  nextWeek: [
    {
      room: "Sala 2",
      floor: "Térreo",
      day: "Segunda",
      startHour: 9,
      endHour: 11,
      title: "Reunião de Planejamento",
    },
    {
      room: "Sala 11",
      floor: "1º Andar",
      day: "Quinta",
      startHour: 14,
      endHour: 16,
      title: "Aula Prática",
    },
  ],
};

function getSchedules() {
  const saved = localStorage.getItem(SCHEDULES_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultSchedules;
}

function saveSchedules(schedules) {
  localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
}
