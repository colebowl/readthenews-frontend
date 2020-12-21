
export const getInitialsFromWords = (str: string, maxLength?: number) => {
  const words = str.trim().split(' ');

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const letters = words.reduce((str, word) => `${str}${word[0]}`, '');

  if (maxLength !== undefined) {
    return letters.slice(0, maxLength);
  }

  return letters;
}

// export const getAvatarLetterUrl = (
//   name: string,
//   backgroundColor: string = 'ededed', textColor: string = '000'
// ) => {
//   if (!name) return '';

//   let bg = backgroundColor;
//   let text = textColor;

//   if (bg.startsWith('#')) {

//     bg = bg.substring(1);
//   }
//   if (text.startsWith('#')) {
//     text = text.substring(1);
//   }
//   // const base = `https://ui-avatars.com/api/?background=${bg}&color=${text}&name=`
//   return getInitialsFromWords(name, 2);
// }
