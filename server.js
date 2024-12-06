const express = require('express');
const app = express();
const port = 3001; // 서버 포트

// 서버가 실행될 때 출력할 메시지
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log('Server is starting...');
  console.log(`Server is running on http://localhost:${port}`);
});
