import { sender } from './constants/sender.js';
import { sendMessage } from './lib/sendMessage.js';
import { getMembers, selectMembers } from './randomSelect.js';
import { celebrate, personalAnnounce } from './celebrate.js';
import { checkText } from './lib/checkText.js';

export const summon = async (plainText, keyword, groupId, botName) => {
  const [n, isInt, msg] = checkText(plainText, keyword);

  // negative number or real numbers
  if (msg) {
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
  }

  if (n) {
    let isFull = true;

    const members = await getMembers(groupId);
    console.log(members);

    // member limit exceeded number
    if (members.length < n) {
      const body = {
        blocks: [
          {
            type: 'text',
            value: `🤢 MAX_NUM available is ${members.length}`,
          },
        ],
        options: ['actAsManager'],
      };
      return sendMessage(sender.GROUP, groupId, 'messages', { botName: botName }, body, 'post');
    }

    const num = isInt ? n : Math.ceil(n);

    // unique random selection
    const managers = await selectMembers(members, num);

    let lastManager = undefined;
    if (!isInt) {
      lastManager = managers.pop();
    }

    let msg = '';
    const MAX_MSG_NUM = 15;

    if (managers > MAX_MSG_NUM) {
      managers.map((manager) => {
        personalAnnounce(manager.id, botName);
        msg += '\n' + '🎉축하드립니다🎉 ' + manager.name + ' 님이 당첨되었습니다!';
      });
      celebrate(msg, groupId, botName);
    } else {
      managers.map((manager) => {
        personalAnnounce(manager.id, botName);
        msg = '🎉축하드립니다🎉 ' + manager.name + ' 님이 당첨되었습니다!';
        celebrate(msg, groupId, botName);
      });
    }

    if (lastManager) {
      isFull = false;
      const name = lastManager.name;

      let halfName = '';

      if (!isFull) {
        for (let i = 0; i < name.length; i++) {
          if (i % 2 == 0) {
            halfName += name[i];
          } else {
            halfName += '*';
          }
        }
      }
      const msg = '🎉축하드립니다🎉 ' + halfName + ' 님이 당첨되었습니다!';
      celebrate(msg, groupId, botName);
    }
  }
};
