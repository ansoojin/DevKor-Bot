function checkText(plainText, keyword) {
    const textList = plainText.split(" ");
    let n = "";
    let msg = "";

    textList.map((x) => {
        if (x.includes(keyword)) {
            let text = x.split(keyword)[0];
            for (let i = text.length - 1; i >= 0; i--) {
                if (Number(text[i]) >= 0) {
                    n = text[i] + n;
                } else {
                    if (text[i] === "-") {
                        msg = "😩 에휴.. 음수를 입력하는 바보가 어딨어. 내가 양수로 바꿔줄게^^ 다음부턴 잘해.";
                    }
                    else if (text[i] === ".") {
                        n = text[i] + n;
                    }
                    else {
                        break
                    }
                }
            }
            n = Number(n);
        }
    })
    return [n, msg];
}

export default checkText;