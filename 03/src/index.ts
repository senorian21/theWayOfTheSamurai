import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const a = 4
    if(a > 5){
        res.send('Ok')
    } else {
        res.send('Hello World!!!!!!')
    }

})

app.get('/samurais', (req, res) => {
    res.send('Hello samurai, Ilya!!!')
})

app.post('/samurais', (req, res) => {
    res.send('We have created samurais!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})