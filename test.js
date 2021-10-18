const crop = (message, maxLength) => {
  const part = message.substring(0, maxLength + 1);
  return part.substring(0, part.lastIndexOf(" ")).trimEnd();
};

console.log(crop("why not ", 100));
