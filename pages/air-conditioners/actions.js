function toggleAc(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.isOn = !room.ac.isOn;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}

function decreaseTemp(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.temperature--;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}

function increaseTemp(roomRame) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomRame);
        if (room) {
            room.ac.temperature++;
            break;
        }
    }

    saveFloors(floors);
    renderAcsResume();
    renderAcCards();
}