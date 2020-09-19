const express = require('express')
const app = express()
const port = 5000
const db_account = require('./db_account.js')
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${db_account.id}:${db_account.password}@nodereact.bkph3.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// MongoDB와 연결 성공 시 콘솔에 "MongoDB connected..." 출력