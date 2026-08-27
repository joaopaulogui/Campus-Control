import express from 'express'
import { prisma } from './lib/prisma';

const app = express()
app.use(express.json())


async function main() {
  const users = await prisma.user.findMany();
  console.log("Conexão OK! Usuários encontrados:", users);
}



app.get('/', (req, res) => {
    main()
        .catch((e) => console.error("Erro:", e))
        .finally(() => prisma.$disconnect());

    res.json({ ok: true })
})

app.listen(3333, () => {
    console.log('HTTP server running')
})