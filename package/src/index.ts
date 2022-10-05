import express from 'express'

const app = express()

app.listen(3000, () => {
    console.log(`The server has been started on port 3000!`)
})