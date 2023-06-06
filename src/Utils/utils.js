export const TruncateString = (myString, length) => {
  const myTruncatedString = `${myString.substring(0, length)}`;
  return myTruncatedString;
};