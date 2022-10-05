import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>')
})

app.get('/name/:name', (req, res) => {
    const name = req.params.name.replace(/\b\w/g, c => c.toUpperCase())
    res.send(`<h1>Hello, ${name}!</h1>`)
})

app.get('/search/:query', (req, res) => {
    const query = req.params.query
    res.redirect(`https://google.com/search?q=${query}`)
})

app.get('/*', (req, res) => {
    res.send('<h1>404 Not Found</h1>\nOno I didn\'t find this page :<')
})

app.listen(3000, () => {
    console.log(`The server has been started on port 3000!`)
})