import { z } from "zod";

export const registerProjectorBodySchema = z.object({
    roomId: z.uuid(),
})