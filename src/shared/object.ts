// thanks SO https://stackoverflow.com/a/15106541
export const randomProperty = (obj: { [key: string]: any }) => {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};
