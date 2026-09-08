import express from 'express'
import cors from 'cors'

import buildingRoutes from './routes/buildings'
import floorRoutes from './routes/floors'
import roomRoutes from './routes/rooms'
import airConditionerRoutes from './routes/air-conditioners'
import userRoutes from './routes/users'
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