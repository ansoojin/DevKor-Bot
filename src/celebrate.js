import { sendMessage } from './lib/sendMessage.js';
import { sender } from './constants/sender.js';

export const celebrate = (msg, groupId, botName) => {
  const body = {
    blocks: [
      {
        type: 'text',
        value: msg,
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
};

export const personalAnnounce = (managerId, botName) => {
  const body = {
    blocks: [
      {
        type: 'text',
        value: '🎉당첨🎉 축하드립니다!',
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.ANNOUNCEMENTS, undefined, 'announce', { botName: botName, managerIds: managerId }, body, 'post');
};
