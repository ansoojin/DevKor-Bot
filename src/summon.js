import { sender } from "./constants/sender.js";
import { sendMessage } from "./lib/sendMessage.js";
import randomSelect from "./randomSelect.js";
import celebrate from "./celebrate.js";
import checkText from "./lib/checkText.js";

const commonBody = (msg) => {
    return {
        blocks: [
            {
                type: "text",
                value: msg,
            },
        ],
        reactions: [
            {
                emojiName: "💥",
                personKeys: ["string"],
            }
        ],
        options: ["actAsManager"],
    }
};

export const summon = (plainText, keyword, groupId, botName) => {
    const [n, isInt, msg] = checkText(plainText, keyword);

    if (msg) {
      sendMessage(sender.GROUP, groupId, "messages", {botName: botName},commonBody(msg), "post");
    }
    
    if (n) {
      let selectedManager = "";
      let isFull = true;
    
      const num = isInt ? n : Math.floor(n);
      for (let i = 0; i < num; i++) {
        selectedManager = await randomSelect(groupId, botName);
        celebrate(selectedManager, groupId, botName, isFull);
      }

      if (!isInt) {
        isFull = false;
        selectedManager = await randomSelect(groupId, botName);
        celebrate(selectedManager, groupId, botName, isFull);
      }
    }
}