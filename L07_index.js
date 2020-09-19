const express = require('express');
const app = express();
const port = 5000;
const db_account = require('./db_account.js');
const mongoose = require('mongoose');
const { User } = require("./models/L03_User.js");
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}));
// application/jason 을 분석해서 가져올 수 있게함
app.use(bodyParser.json());


mongoose.connect(`mongodb+srv://${db_account.id}:${db_account.password}@nodereact.bkph3.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보를 client에서 가져오면 
  // db에 넣음
  
  console.log("req.body: ", req.body);
  // bodyParser 덕분에 req.body 안에 json형식으로 데이터가 저장됨
  const user = new User(req.body);
  
  console.log("user: ", user)

  // mongoDB method - 정보들이 user 모델에 저장됨
  user.save((err, userInfo) =>{
      // 에러 있는 경우
      if(err) return res.setDefaultEncoding({success: false, err})
      // 성공한 경우
      return res.status(200).json({
          success: true
      });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// json 형식의 데이터를 보냈을 때 MongoDB에 저장
// 데이터 전송 페이지 아직 안만들어서 Postman 프로그램 사용
