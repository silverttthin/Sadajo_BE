const express = require('express')
const app = express()

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