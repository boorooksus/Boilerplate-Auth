const express = require('express');
const app = express();
const port = 5000;
const db_account = require('./db_account.js');
const mongoose = require('mongoose');
const { User } = require("./models/L03_User.js");
const bodyParser = require('body-parser');
const config = require('./config/L09_key');

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}));
// application/jason 을 분석해서 가져올 수 있게함
app.use(bodyParser.json());


// 보안을 위해 mongoDB URI를 config 폴더의 key파일에서 가져옴
mongoose.connect(config.mongoURI, {
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
      if(err) return res.setDefaultEncoding({success: false, err})
      return res.status(200).json({
          success: true
      });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// mongoDB URI를 config 폴더 내의 정보들로 가져오도록 변경(16번째 줄)