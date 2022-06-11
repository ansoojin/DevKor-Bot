import express from 'express';
import { select } from './select.js';

const router = express.Router();
const botName = 'DevKor';

router.post('/select', async (res) => {
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
      select(plainText, keyword, groupId, botName);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
