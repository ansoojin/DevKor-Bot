const checkNum = (string) => {
  const num = Number(string);
  if (!isNaN(num)) {
    const isInt = num % 1 === 0 ? true : false;
    return {
      isInt: isInt,
      num: num,
    };
  }

  return {
    isInt: false,
    num: undefined,
  };
};

export const checkText = (plainText, keyword) => {
  const textList = plainText.split(' ');
  let n = undefined;
  let msg = undefined;

  const textLen = textList.length;
  for (let i = textLen - 1; i >= 0; i--) {
    let x = textList[i];

    if (x.includes(keyword)) {
      console.log(x);
      const text = x.split(keyword)[0];
      const { isInt, num } = checkNum(text);

      if (num < 0) {
        msg = '😩 에휴.. 음수를 입력하는 바보가 어딨어. 내가 자연수로 바꿔줄게^^ 다음부턴 잘해.';
        n = -Math.floor(num);
      } else if (!isInt) {
        msg = '아 또 소수점..😤';
        n = num;
      } else {
        n = num;
      }
      return [n, isInt, msg];
    }
  }
};
