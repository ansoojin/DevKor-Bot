import express from 'express';
import dotenv from 'dotenv';
import { summon } from './src/summon.js';
import { sendMessage } from "./src/lib/sendMessage.js";
import { sender } from "./src/constants/sender.js";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const botName = 'DevKor';

app.post('/select', async (res) => {
  try {
    const { body } = res;
    const { event, entity } = body;
    const { plainText = '', personType = '', chatId: groupId } = entity;

    const isPushEvent = event === 'push';
    const keyword = '명';
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

app.post('/stop', async (res) => {
  try {
    const { body } = res;
    const { event, entity } = body;
    const { plainText = '', personType = '', chatId: groupId } = entity;

    const isPushEvent = event === 'push';
    const keyword = '/멈춰';
    const hasKeyword = plainText.includes(keyword);
    const isManager = personType === 'manager';

    const needToSummon = isPushEvent && hasKeyword && isManager;

    if (needToSummon) {
      const body = {
        blocks: [
          {
            type: 'text',
            value: "Okay! I will stop it!",
          },
        ],
        options: ['actAsManager'],
      };
      sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
    }
  } catch (err) {
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
