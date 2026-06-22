function toggleDoor(roomName) {
    for (const floor of floors) {
        const room = floor.rooms.find(item => item.name === roomName)
        if (room) {
            if (room.status == "locked") {
                room.status = "unlocked";
            } else if (room.status == "unlocked") {
                room.status = "locked";
            }
        }
    }

    saveFloors(allFloors);
    renderFloorsResume();
    renderRoomsTable();
}