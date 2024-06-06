export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
// export const getLocalStorage = (key, dispatch = () => {}) => {
//   const itemStr = localStorage.getItem(key);
//   if (!itemStr) {
//     return null;
//   }
//   const now = new Date();
//   const item = JSON.parse(itemStr);
//   if (dispatch && item.expiry && now.getTime() > item.expiry) {
//     dispatch();
//   }
//   return item.value;
// };
