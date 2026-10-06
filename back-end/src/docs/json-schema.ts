import { z } from "zod"

type JsonSchemaObject = {
    $schema?: string
    properties?: Record<string, Record<string, unknown>>
    required?: string[]
    [key: string]: unknown
}

export function toOpenApiSchema(schema: z.ZodType) {
    const json = z.toJSONSchema(schema, { target: "openapi-3.0" }) as JsonSchemaObject

    delete json.$schema

    return json
}

export function toOpenApiParameters(
    schema: z.ZodType,
    location: "query" | "path",
) {
    const json = toOpenApiSchema(schema)
    const properties = json.properties ?? {}
    const required = json.required ?? []

    return Object.entries(properties).map(([name, propertySchema]) => ({
        name,
        in: location,
        required: required.includes(name),
        schema: propertySchema,
    }))
}

export function jsonContent(schema: z.ZodType) {
    return {
        content: {
            "application/json": {
                schema: toOpenApiSchema(schema),
            },
        },
    }
}
