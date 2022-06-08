import fetch from "node-fetch";

async function getMembers(auth, groupId) {
    try {
        let memberList = [];
        const url = "https://api.channel.io/open/v5/groups/" + String(groupId) + "/sessions";
        const headers = {
            accept: "application/json",
            "x-access-key": auth["accessKey"],
            "x-access-secret": auth["accessSecret"],
        }
        const response = await fetch(
            url,
            {
                method: "get",
                headers: headers,
            }
        );
        const data = await response.json();
        await Promise.all(data["sessions"].map(async (iter) => {
            memberList.push(iter["personId"]);
        }))
        
        return memberList;
        
    } catch (err) {
        console.log(err);
    }
}

function selectMember(memberList) {
    let pickedIdx = 0;
    let managerId = "";
    try {
        pickedIdx = Math.floor(Math.random() * memberList.length);
        managerId = memberList[pickedIdx];
        return managerId;
    } catch (err) {
        console.log(err);
    }
}

async function getMemberName(auth, managerId) {
    try {
        const url = "https://api.channel.io/open/v5/managers/" + String(managerId);
        const headers = {
            accept: "application/json",
            "x-access-key": auth["accessKey"],
            "x-access-secret": auth["accessSecret"],
        };
        const response = await fetch(
            url,
            {
                method: "get",
                headers: headers,
            }
        );
        const data = await response.json();
        return data["manager"]["name"];
    } catch (err) {
        console.log(err);
    }
}

async function personalAnnounce(auth, managerId, botName) {
    try {
        const url = "https://api.channel.io/open/v5/announcements/announce?botName=" + botName + "&managerIds=" + String(managerId);
        const headers = {
            access: "application/json",
            "content-type": "application/json",
            "x-access-key": auth["accessKey"],
            "x-access-secret": auth["accessSecret"],
        }
        const body = {
            blocks: [
                {
                    type: "text",
                    value: "🎉당첨🎉 축하드립니다!",
                },
            ],
            options: ["actAsManager"],
        };
        const response = await fetch(
            url,
            {
                method: "post",
                headers: headers,
                body: JSON.stringify(body),
    
            }
        )
    } catch (err) {
        console.log(err);
    }
}

async function randomSelect(auth, groupId, botName) {
    const memberList = await getMembers(auth, groupId);
    const managerId = await selectMember(memberList);
    const selectedManager = await getMemberName(auth, managerId);
    const announcement = await personalAnnounce(auth, managerId, botName);
    return selectedManager;
}

export default randomSelect;