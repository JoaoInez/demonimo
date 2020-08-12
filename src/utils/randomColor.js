const colors = ["yellow", "orange", "pink", "purple", "blue"];

const getRandomColor = (styles) =>
  styles[colors[Math.floor(Math.random() * colors.length)]];

export default getRandomColor;
