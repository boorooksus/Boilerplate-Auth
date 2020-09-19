const express = require('express')
const app = express()
// 이번 프로젝트는 3000번이 아닌 5000번 포트를 사용
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// pakage.jason에서 script 안에 "start": "node index.js"를 추가함. 터미널에서 npm run start 입력하면 실행됨.