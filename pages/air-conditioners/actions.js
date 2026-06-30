function toggleAc(roomName) {
  for (const floor of floors) {
    const room = floor.rooms.find((item) => item.name === roomName);
    if (room) {
      room.ac.isOn = !room.ac.isOn;
      break;
    }
  }
  saveFloors(allFloors);
  renderAcsResume();
  renderAcCards();
}

function decreaseTemp(roomName) {
  for (const floor of floors) {
    const room = floor.rooms.find((item) => item.name === roomName);
    if (room) {
      if (room.ac.temperature > 16) {
        room.ac.temperature--;
      }
      break;
    }
  }
  saveFloors(allFloors);
  renderAcsResume();
  renderAcCards();
}

function increaseTemp(roomName) {
  for (const floor of floors) {
    const room = floor.rooms.find((item) => item.name === roomName);
    if (room) {
      if (room.ac.temperature < 32) {
        room.ac.temperature++;
      }
      break;
    }
  }
  saveFloors(allFloors);
  renderAcsResume();
  renderAcCards();
}

function changeAcStatus(roomName, newStatus) {
  for (const floor of floors) {
    const room = floor.rooms.find((item) => item.name === roomName);
    if (room) {
      room.ac.class = newStatus;
      break;
    }
  }
  saveFloors(allFloors);
  renderAcsResume();
  renderAcCards();
}
