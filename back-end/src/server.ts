import express from 'express'
import cors from 'cors'

import floorRoutes from './routes/floors'
import roomRoutes from './routes/rooms'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ ok: true })
})

app.use('/api/floors', floorRoutes)
app.use('/api/rooms', roomRoutes)

app.listen(3333, () => {
    console.log('HTTP server running')
})