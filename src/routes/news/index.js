import express from 'express';
import { getNews } from './scraping.js';
import { sender } from '../../constants/sender.js';
import { sendMessage } from '../../lib/sendMessage.js';


const router = express.Router();
const botName = 'DevKor';

router.post('/', async (res) => {
  try {
    const { body } = res;
    const { event, entity } = body;
    const { plainText = '', personType = '', chatId: groupId } = entity;

    const isPushEvent = event === 'push';
    const keyword = '/뉴스';
    const hasKeyword = plainText.includes(keyword);
    const isManager = personType === 'manager';

    const needToSummon = isPushEvent && hasKeyword && isManager;

      if (needToSummon) {
          console.log(getNews());
          const body = {
            blocks: [
              {
                type: 'text',
                value: '🔥오늘의 Tech News🔥',
              },
            ],
            options: ['actAsManager'],
          };
        
          sendMessage(sender.ANNOUNCEMENTS, undefined, 'announce', { botName: botName, managerIds: managerId }, body, 'post');
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
