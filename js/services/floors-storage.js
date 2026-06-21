const FLOORS_KEY = "floors";

const defaultFloors = [
    { name: "Térreo", rooms: [
        { name: "Sala 1", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 21, isOn: true }},
        { name: "Sala 2", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 24, isOn: false }},
        { name: "Sala 3", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "warning", temperature: 23, isOn: true }},
        { name: "Sala 4", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 23, isOn: true }},
        { name: "Sala 5", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 22, isOn: false }},
        { name: "Sala 6", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "broken", temperature: 25, isOn: false }},
        { name: "Sala 7", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 22, isOn: true }},
        { name: "Sala 8", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "warning", temperature: 23, isOn: true }},
        { name: "Sala 9", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 26, isOn: false }},
        { name: "Sala 10", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 24, isOn: true }},
    ]},

    { name: "1º Andar", rooms: [
        { name: "Sala 11", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 22, isOn: true }},
        { name: "Sala 12", type: "Sala de Aula", capacity: 40, status: "locked", ac: { class: "working", temperature: 21, isOn: true }},
    ]}
]

function getFloors() {
    const saved = localStorage.getItem(FLOORS_KEY)
    if (saved) {
        return JSON.parse(saved)
    }
    return defaultFloors
}

function saveFloors(floors) {
    localStorage.setItem(FLOORS_KEY, JSON.stringify(floors))
}

