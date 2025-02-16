const express = require('express')
const app = express()
const { connectDb } = require('./db');

// JSON 파싱을 위한 미들웨어
app.use(express.json())

// 일반 라우터
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// API 라우터
const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

// 서버 실행 전에 MongoDB 연결 시도
connectDb().then(() => {
  app.listen(8080, () => {
      console.log('🚀 서버 실행 중: http://localhost:8080');
  });
}).catch(err => {
  console.error('❌ 서버 실행 실패:', err);
});