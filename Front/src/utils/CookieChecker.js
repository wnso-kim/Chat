export const isExistCookie = (obj) => {
  if (Object.keys(obj).length === 0) {
    return false;
  } else {
    return true;
  }
};
