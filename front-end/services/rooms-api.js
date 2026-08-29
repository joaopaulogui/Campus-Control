async function getFloorsFromApi() {
  return apiRequest("/api/floors");
}

async function toggleRoomLockOnApi(roomId) {
  return apiRequest(`/api/rooms/${roomId}/lock`, { method: "PATCH" });
}
