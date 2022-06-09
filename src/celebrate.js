import { sendMessage } from './lib/sendMessage.js';
import { sender } from './constants/sender';

const celebrate = async (selectedManager, groupId, botName, isFull = true) => {
  let msg = '';
  if (!isFull) {
    let halfName = '';
    for (let i = 0; i < selectedManager.length; i++) {
      if (i % 2 == 0) {
        halfName += selectedManager[i];
      } else {
        halfName += '*';
      }
    }
    msg = '🎉축하드립니다🎉 ' + halfName + ' 님이 당첨되었습니다!';
  } else {
    msg = '🎉축하드립니다🎉 ' + selectedManager + ' 님이 당첨되었습니다!';
  }

  const body = {
    blocks: [
      {
        type: 'text',
        value: msg,
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.GROUP, String(groupId), 'messages', { botName: botName }, body, 'post');
};

export default celebrate;
