const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://kyleidea:asdfjkl64@kyle.pfmyc.mongodb.net/?retryWrites=true&w=majority&appName=Kyle'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('Sadajo')
}).catch((err)=>{
  console.log(err)
})

// JSON 파싱을 위한 미들웨어
app.use(express.json())

// 일반 라우터
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// API 라우터
const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})