import type { Express } from "express"
import swaggerUi from "swagger-ui-express"
import { openApiDocument } from "./openapi"

export function setupSwagger(app: Express) {
    app.get("/openapi.json", (_req, res) => {
        res.json(openApiDocument)
    })

    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(openApiDocument, {
            customSiteTitle: "Campus Control API",
            swaggerOptions: {
                persistAuthorization: true,
                displayRequestDuration: true,
            },
        }),
    )
}
