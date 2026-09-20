import { jsonContent, toOpenApiParameters } from "./json-schema"
import { healthResponseSchema, unauthorizedResponseSchema } from "../http/schemas/common"
import {
    authenticateUserBodySchema,
    authenticateUserResponseSchema,
    registerUserBodySchema,
} from "../http/schemas/users"
import {
    registerBuildingBodySchema,
    deleteBuildingParamsSchema,
    listBuildingsResponseSchema,
} from "../http/schemas/buildings"
import {
    registerFloorBodySchema,
    deleteFloorParamsSchema,
    listFloorsQuerySchema,
    listFloorsResponseSchema,
} from "../http/schemas/floors"
import {
    registerRoomBodySchema,
    deleteRoomParamsSchema,
    listRoomsQuerySchema,
    listRoomsResponseSchema,
    toggleRoomLockParamsSchema,
} from "../http/schemas/rooms"
import {
    registerAirConditionerBodySchema,
    listAirConditionersQuerySchema,
    listAirConditionersResponseSchema,
    toggleAirConditionerParamsSchema,
    deleteAirConditionerParamsSchema,
} from "../http/schemas/air-conditioners"
import { RegisterItemBodySchema } from "../http/schemas/items"

const unauthorizedResponse = {
    description: "Missing or invalid JWT",
    ...jsonContent(unauthorizedResponseSchema),
}

const bearerAuth = [{ bearerAuth: [] }]

export const openApiDocument = {
    openapi: "3.0.3",
    info: {
        title: "Campus Control API",
        version: "1.0.0",
        description: "HTTP API for campus buildings, rooms, users and air conditioners. Schemas are generated from the same Zod validators used by the controllers.",
    },
    servers: [
        {
            url: "http://localhost:3333",
            description: "Local development",
        },
    ],
    tags: [
        { name: "Health" },
        { name: "Users" },
        { name: "Buildings" },
        { name: "Floors" },
        { name: "Rooms" },
        { name: "Air conditioners" },
    ],
    paths: {
        "/": {
            get: {
                tags: ["Health"],
                summary: "Health check",
                responses: {
                    200: {
                        description: "API is up",
                        ...jsonContent(healthResponseSchema),
                    },
                },
            },
        },
        "/api/users/login": {
            post: {
                tags: ["Users"],
                summary: "Authenticate user",
                requestBody: {
                    required: true,
                    ...jsonContent(authenticateUserBodySchema),
                },
                responses: {
                    200: {
                        description: "JWT issued",
                        ...jsonContent(authenticateUserResponseSchema),
                    },
                },
            },
        },
        "/api/users": {
            post: {
                tags: ["Users"],
                summary: "Register user",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(registerUserBodySchema),
                },
                responses: {
                    201: { description: "User registered" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/buildings": {
            get: {
                tags: ["Buildings"],
                summary: "List buildings",
                security: bearerAuth,
                responses: {
                    200: {
                        description: "Building list",
                        ...jsonContent(listBuildingsResponseSchema),
                    },
                    401: unauthorizedResponse,
                },
            },
            post: {
                tags: ["Buildings"],
                summary: "Register building",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(registerBuildingBodySchema),
                },
                responses: {
                    201: { description: "Building registered" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/buildings/{buildingId}": {
            delete: {
                tags: ["Buildings"],
                summary: "Delete building",
                security: bearerAuth,
                parameters: toOpenApiParameters(deleteBuildingParamsSchema, "path"),
                responses: {
                    204: { description: "Building deleted" },
                    401: unauthorizedResponse
                }
            }
        },
        "/api/floors": {
            get: {
                tags: ["Floors"],
                summary: "List floors by building",
                security: bearerAuth,
                parameters: toOpenApiParameters(listFloorsQuerySchema, "query"),
                responses: {
                    200: {
                        description: "Floor list",
                        ...jsonContent(listFloorsResponseSchema),
                    },
                    401: unauthorizedResponse,
                },
            },
            post: {
                tags: ["Floors"],
                summary: "Register floor",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(registerFloorBodySchema),
                },
                responses: {
                    201: { description: "Floor registered" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/floors/{floorId}": {
            delete: {
                tags: ["Floors"],
                summary: "Delete floor",
                security: bearerAuth,
                parameters: toOpenApiParameters(deleteFloorParamsSchema, "path"),
                responses: {
                    204: { description: "Floor deleted" },
                    401: unauthorizedResponse
                }
            }
        },
        "/api/rooms": {
            get: {
                tags: ["Rooms"],
                summary: "List rooms",
                security: bearerAuth,
                parameters: toOpenApiParameters(listRoomsQuerySchema, "query"),
                responses: {
                    200: {
                        description: "Room list",
                        ...jsonContent(listRoomsResponseSchema),
                    },
                    401: unauthorizedResponse,
                },
            },
            post: {
                tags: ["Rooms"],
                summary: "Register room",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(registerRoomBodySchema),
                },
                responses: {
                    201: { description: "Room registered" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/rooms/{roomId}/lock": {
            patch: {
                tags: ["Rooms"],
                summary: "Toggle room lock",
                security: bearerAuth,
                parameters: toOpenApiParameters(toggleRoomLockParamsSchema, "path"),
                responses: {
                    204: { description: "Lock status toggled" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/rooms/{roomId}": {
            delete: {
                tags: ["Rooms"],
                summary: "Delete room",
                security: bearerAuth,
                parameters: toOpenApiParameters(deleteRoomParamsSchema, "path"),
                responses: {
                    204: { description: "Room deleted" },
                    401: unauthorizedResponse
                }
            }
        },
        "/api/air-conditioners": {
            get: {
                tags: ["Air conditioners"],
                summary: "List air conditioners grouped by floor and room",
                security: bearerAuth,
                parameters: toOpenApiParameters(listAirConditionersQuerySchema, "query"),
                responses: {
                    200: {
                        description: "Air conditioners grouped by floor",
                        ...jsonContent(listAirConditionersResponseSchema),
                    },
                    401: unauthorizedResponse,
                },
            },
            post: {
                tags: ["Air conditioners"],
                summary: "Register air conditioner",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(registerAirConditionerBodySchema),
                },
                responses: {
                    201: { description: "Air conditioner registered" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/air-conditioners/{airConditionerId}/toggle": {
            patch: {
                tags: ["Air conditioners"],
                summary: "Toggle air conditioner power",
                security: bearerAuth,
                parameters: toOpenApiParameters(toggleAirConditionerParamsSchema, "path"),
                responses: {
                    204: { description: "Power status toggled" },
                    401: unauthorizedResponse,
                },
            },
        },
        "/api/air-conditioners/{airConditionerId}": {
            delete: {
                tags: ["Air conditioners"],
                summary: "Delete air conditioner",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                parameters: toOpenApiParameters(deleteAirConditionerParamsSchema, "path"),
                responses: {
                    204: { description: "Air conditioner deleted" },
                    401: unauthorizedResponse
                }
            }
        },
        "/api/items/": {
            post: {
                tags: ["Items"],
                summary: "Register item",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(RegisterItemBodySchema)
                },
                responses: {
                    204: { description: "Item registered" },
                    401: unauthorizedResponse
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Access token returned by POST /api/users/login",
            },
        },
    },
}
