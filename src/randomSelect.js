import { sendMessage } from './lib/sendMessage.js';
import { sender } from './constants/sender.js';

const getMembers = async (groupId) => {
  let members = [];

  const response = sendMessage(sender.GROUP, String(groupId), 'sessions', undefined, undefined, 'get');
  const data = response.json();

  await Promise.all(
    data['sessions'].map(async (iter) => {
      members.push(iter['personId']);
    }),
  );

  return members;
};

const selectMember = (memberList) => {
  let pickedIdx = 0;
  let managerId = '';

  pickedIdx = Math.floor(Math.random() * memberList.length);
  managerId = memberList[pickedIdx];

  return managerId;
};

const getMemberName = async (managerId) => {
  const response = sendMessage(sender.MANAGER, String(managerId), '', undefined, undefined, 'get');
  const data = await response.json();
  return data['manager']['name'];
};

const personalAnnounce = async (managerId, botName) => {
  const body = {
    blocks: [
      {
        type: 'text',
        value: '🎉당첨🎉 축하드립니다!',
      },
    ],
    options: ['actAsManager'],
  };

  sendMessage(sender.ANNOUNCEMENTS, undefined, 'announce', { botName: botName, managerIds: String(managerId) }, body, 'post');
};

const randomSelect = async (groupId, botName) => {
  const memberList = await getMembers(groupId);
  const managerId = await selectMember(memberList);
  const selectedManager = await getMemberName(managerId);
  await personalAnnounce(managerId, botName);
  return selectedManager;
};

export default randomSelect;
