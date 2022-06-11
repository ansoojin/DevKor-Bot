export const getRandomNum = (max, n) => {
  const set = new Set();

  while (set.size !== n) {
    const randomNum = Math.floor(Math.random() * max);
    set.add(randomNum);
  }

  return set;
};
