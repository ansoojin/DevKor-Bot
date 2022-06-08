import express from "express";
import dotenv from "dotenv";
import sendMessage from "./src/send-message.js";
import randomSelect from "./src/random-select.js";
import celebrate from "./src/celebrate.js";


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

        const needToSummon = isPushEvent && hasKeyword && isManager;


        if (needToSummon) {
            const msg = "Test Message!";
            // sendMessage(auth, msg, groupId, botName);
            const selectedManager = await randomSelect(auth, groupId, botName);
            celebrate(auth, selectedManager, groupId, botName);
        }
    } catch (err) {
        console.log(err);
    }
})