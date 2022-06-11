import { sendMessage } from './lib/sendMessage.js';
import { sender } from './constants/sender.js';
import { getRandomNum } from './lib/getRandomNum.js';

export const getMembers = async (groupId) => {
  const members = [];

  const response = await sendMessage(sender.GROUP, groupId, 'sessions', undefined, undefined, 'get');
  const data = await response.json();

  data['sessions'].map((iter) => {
    members.push(iter['personId']);
  });

  return members;
};

export const selectMembers = async (members, n) => {
  const managers = [];
  const selectedIdx = getRandomNum(members.length, n);

  selectedIdx.forEach(async (idx) => {
    const response = await sendMessage(sender.MANAGER, members[idx], '', undefined, undefined, 'get');
    const data = await response.json();

    managers.push({ id: members[idx], name: data['manager']['name'] });
  });

  return managers;
};
