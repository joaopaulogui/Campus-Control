import { jsonContent, toOpenApiParameters } from "./json-schema"
import { healthResponseSchema, unauthorizedResponseSchema } from "../http/schemas/common"
import {
    authenticateUserBodySchema,
    authenticateUserResponseSchema,
    createUserBodySchema,
} from "../http/schemas/users"
import {
    createBuildingBodySchema,
    listBuildingsResponseSchema,
} from "../http/schemas/buildings"
import {
    createFloorBodySchema,
    listFloorsQuerySchema,
    listFloorsResponseSchema,
} from "../http/schemas/floors"
import {
    createRoomBodySchema,
    listRoomsQuerySchema,
    listRoomsResponseSchema,
    toggleRoomLockParamsSchema,
} from "../http/schemas/rooms"
import {
    createAirConditionerBodySchema,
    listAirConditionersQuerySchema,
    listAirConditionersResponseSchema,
    toggleAirConditionerParamsSchema,
} from "../http/schemas/air-conditioners"

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
                    201: {
                        description: "JWT issued",
                        ...jsonContent(authenticateUserResponseSchema),
                    },
                },
            },
        },
        "/api/users": {
            post: {
                tags: ["Users"],
                summary: "Create user",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(createUserBodySchema),
                },
                responses: {
                    201: { description: "User created" },
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
                summary: "Create building",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(createBuildingBodySchema),
                },
                responses: {
                    201: { description: "Building created" },
                    401: unauthorizedResponse,
                },
            },
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
                summary: "Create floor",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(createFloorBodySchema),
                },
                responses: {
                    201: { description: "Floor created" },
                    401: unauthorizedResponse,
                },
            },
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
                summary: "Create room",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(createRoomBodySchema),
                },
                responses: {
                    201: { description: "Room created" },
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
                    200: { description: "Lock status toggled" },
                    401: unauthorizedResponse,
                },
            },
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
                summary: "Create air conditioner",
                description: "Requires JWT and ADMIN role.",
                security: bearerAuth,
                requestBody: {
                    required: true,
                    ...jsonContent(createAirConditionerBodySchema),
                },
                responses: {
                    201: { description: "Air conditioner created" },
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
                    200: { description: "Power status toggled" },
                    401: unauthorizedResponse,
                },
            },
        },
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
