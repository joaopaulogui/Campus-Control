async function toggleDoor(roomId) {
  const room = allFloors
    .flatMap((floor) => floor.rooms)
    .find((item) => item.id === roomId);

  if (!room) {
    return;
  }

  try {
    const updatedRoom = await toggleRoomLockOnApi(roomId);

    for (const floor of allFloors) {
      const roomToUpdate = floor.rooms.find((item) => item.id === roomId);
      if (roomToUpdate) {
        roomToUpdate.isLocked = updatedRoom.isLocked;
      }
    }

    for (const floor of floors) {
      const roomToUpdate = floor.rooms.find((item) => item.id === roomId);
      if (roomToUpdate) {
        roomToUpdate.isLocked = updatedRoom.isLocked;
      }
    }

    renderFloorsResume();
    renderRoomsTable();
  } catch (error) {
    console.error("Não foi possível trocar o status da sala.", error);
  }
}
