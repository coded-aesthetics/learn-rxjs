export const getRandomColor = () => {
  let color = (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
  while (color.length < 6) {
    color = '0' + color;
  }
  console.log(color);
  return '#' + color;
};
