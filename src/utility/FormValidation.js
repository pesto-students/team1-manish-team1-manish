export const emailValidation = (emailId) => {
  const emailRegx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;

  if (emailRegx.test(emailId)) {
    return true;
  }
  return false;
};

export const phoneNoValidation = (mobNo) => {
  return mobNo.length == 10 ? true : false;
};

export const inputValidation = (inputText) => {
  if (inputText.length > 0) {
    return true;
  }
  return false;
};
