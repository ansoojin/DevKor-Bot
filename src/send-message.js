import fetch from "node-fetch";

async function sendMessage(auth, msg, groupId, botName) {
    try {
        const url = "https://api.channel.io/open/v5/groups/" + String(groupId) + "/messages?botName=" + botName;
        const body = {
            blocks: [
                {
                    type: "text",
                    value: msg,
                },
            ],
            options: ["actAsManager"],
        };
        const header = {
            accept: "application/json",
            "content-type": "application/json",
            "x-access-key": auth["accessKey"],
            "x-access-secret": auth["accessSecret"],
        };
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: header,
        });
        const data = await response.json();
        console.log(data);
        return;
    } catch (err) {
        console.log(err);
    }
}

export default sendMessage;
