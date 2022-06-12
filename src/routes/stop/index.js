import express from 'express';
import { sendMessage } from '../../lib/sendMessage.js';
import { sender } from '../../constants/sender.js';
import { stop } from './stop.js';

const router = express.Router();
const botName = 'DevKor';

router.post('/', async (res) => {
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
            value: 'Okay! I will stop it!',
          },
        ],
        options: ['actAsManager'],
      };
      sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
      setTimeout(() => {
        stop();
      }, 5000);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
