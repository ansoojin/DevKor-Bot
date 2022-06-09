import express from "express";
import dotenv from "dotenv";
import sendMessage from "./src/send-message.js";
import randomSelect from "./src/random-select.js";
import celebrate from "./src/celebrate.js";
import checkText from "./src/check-text.js";

dotenv.config();

const auth = {
    "accessKey": process.env.ACCESS_KEY,
    "accessSecret": process.env.ACCESS_SECRET,
};
const app = express();
const port = process.env.PORT;
const keyword = "명";
const botName = "DevKor";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

app.post("/", async (res) => {
    try {
        const { body } = res;
        const { event, entity } = body;
        const { plainText = "", personType = "", chatId: groupId } = entity;

        const isPushEvent = event === "push";
        const hasKeyword = plainText.includes(keyword);
        const isManager = personType === "manager";

        let [n, msg] = checkText(plainText, keyword);

        let hasNumber = false;
        if (n) {
            hasNumber = true;
        }
        if (msg) {
            sendMessage(auth, msg, groupId, botName);
        }

        const needToSummon = isPushEvent && hasKeyword && isManager && hasNumber;
        let selectedManager = ""
        let isFull = true;

        if (needToSummon) {
            if (Number.isInteger(n)) {
                for (let i = 0; i < n; i++) {
                    selectedManager = await randomSelect(auth, groupId, botName);
                    celebrate(auth, selectedManager, groupId, botName, isFull);
                }
            } else {
                n = Math.floor(n);
                msg = "아 또 소수점..😤";
                sendMessage(auth, msg, groupId, botName);
                for (let i = 0; i < n; i++) {
                    selectedManager = await randomSelect(auth, groupId, botName);
                    celebrate(auth, selectedManager, groupId, botName, isFull);
                }
                isFull = false;
                selectedManager = await randomSelect(auth, groupId, botName);
                celebrate(auth, selectedManager, groupId, botName, isFull);
            }
        }
    } catch (err) {
        console.log(err);
    }
})
