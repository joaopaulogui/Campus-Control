function toggleDoor(roomName) {
  for (const floor of floors) {
    const room = floor.rooms.find((item) => item.name === roomName);
    if (room) {
      room.isLocked = !room.isLocked
    }
  }

  saveFloors(allFloors);
  renderFloorsResume();
  renderRoomsTable();
}
