import type { QueryClient } from "@tanstack/react-query"

export const QUERY_KEYS = {
  ME: ["me"] as const,
  ROOMS: {
    all: ["rooms"] as const,
    byId: (id?: string) => ["room_get_by_id", id] as const,
  },
  AIR_CONDITIONERS: {
    all: ["air-conditioners"] as const,
  },
  PROJECTORS: {
    all: ["projectors"] as const,
  },
  ITEMS: {
    all: ["items"] as const,
    byId: (id?: string) => ["item_get_by_id", id] as const,
  },
  LOANS: {
    all: ["loans"] as const,
  },
  BUILDINGS: {
    all: ["buildings"] as const,
    byId: (id?: string) => ["building_get_by_id", id] as const,
  },
  FLOORS: {
    all: ["floors"] as const,
    byId: (id?: string) => ["floor_get_by_id", id] as const,
  },
  USERS: {
    all: ["users"] as const,
    byId: (id?: string) => ["user_get_by_id", id] as const,
  },
  AUDITS: {
    all: ["audits"] as const,
  },
  RECENT_ACTIVITIES: {
    all: ["recent-activities"] as const,
  },
} as const

export function invalidateLoanRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOANS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateItemRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ITEMS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOANS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateRoomRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FLOORS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateEquipmentRelatedQueries(
  queryClient: QueryClient,
  type?: "ac" | "projector"
) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS.all })
  if (!type || type === "ac") {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AIR_CONDITIONERS.all })
  }
  if (!type || type === "projector") {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTORS.all })
  }
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateFloorRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FLOORS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUILDINGS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateBuildingRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUILDINGS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FLOORS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}

export function invalidateUserRelatedQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECENT_ACTIVITIES.all })
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUDITS.all })
}
