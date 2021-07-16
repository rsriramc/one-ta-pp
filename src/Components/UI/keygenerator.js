const generateKey = () => {
   let key = [];
   for (let i = 0; i < 7; i++) key.push(Math.floor(Math.random() * 9) + 1);
   return key.join("");
};
export default generateKey;
