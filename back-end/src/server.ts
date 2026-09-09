import express from 'express'
import cors from 'cors'

import buildingRoutes from './http/routes/buildings'
import floorRoutes from './http/routes/floors'
import roomRoutes from './http/routes/rooms'
import airConditionerRoutes from './http/routes/air-conditioners'
import userRoutes from './http/routes/users'
import { setupSwagger } from './docs/setup-swagger'

const app = express()

app.use(cors())
app.use(express.json())

setupSwagger(app)

app.get('/', (req, res) => {
    res.json({ ok: true })
})

app.use('/api/buildings', buildingRoutes)
app.use('/api/floors', floorRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/air-conditioners', airConditionerRoutes)
app.use('/api/users', userRoutes)

app.listen(3333, () => {
    console.log('HTTP server running')
})