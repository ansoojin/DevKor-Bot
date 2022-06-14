import express from 'express';

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
          console.log("NEWS WEBHOOK");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
