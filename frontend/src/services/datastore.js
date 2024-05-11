export const setLocalStorage = (key, value, expirySeconds) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expirySeconds * 1000, // milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export const getLocalStorage = (key, dispatch) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (item.expiry && now.getTime() > item.expiry) {
    dispatch();
  }
  return item.value;
};
