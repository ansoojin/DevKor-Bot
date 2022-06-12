import express from 'express';
import dotenv from 'dotenv';

import router from './src/routes/index.js';

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
