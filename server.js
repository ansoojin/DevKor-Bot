import express from 'express';
import dotenv from 'dotenv';
import { summon } from './src/summon.js';

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const botName = 'DevKor';
const keyword = '명';

app.post('/', async (res) => {
  try {
    const { body } = res;
    const { event, entity } = body;
    const { plainText = '', personType = '', chatId: groupId } = entity;

    const isPushEvent = event === 'push';
    const hasKeyword = plainText.includes(keyword);
    const isManager = personType === 'manager';

    const needToSummon = isPushEvent && hasKeyword && isManager;

    if (needToSummon) {
      summon(plainText, keyword, groupId, botName);
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
