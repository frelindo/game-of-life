import express from 'express'

const app = express()

app.listen(3000, () => {
    console.log(`Der Server läuft auf port 3000`)
})