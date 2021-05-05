const express = require('express')
const config = require('config')
const app = express()
const mongoose = require('mongoose')
const PORT = config.get('port') || 5000
const cors = require('cors')

app.use(cors())

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))

mongoose.connect(
    config.get('mongo'),
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log(`mongo has been started`))
    .catch(error => console.log('==========>error', error))

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`)
})



