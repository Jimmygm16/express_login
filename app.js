import express from 'express';
import users from './routes/users.js';
import auth from './routes/auth.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use('/api/users', users);
app.use('/api/auth', auth);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  }
);