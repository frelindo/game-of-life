import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>')
})

app.get('/name/:name', (req, res) => {
    const name = req.params.name.replace(/\b\w/g, c => c.toUpperCase())
    res.send(`<h1>Hello, ${name}!</h1>`)
})

app.listen(3000, () => {
    console.log(`The server has been started on port 3000!`)
})