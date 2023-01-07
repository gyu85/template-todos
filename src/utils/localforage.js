import localforage from 'localforage';

export const setLocalforage = (key, value) => {
  const itemValue = typeof value === 'string' ? value : JSON.stringify(value);

  return localforage.setItem(key, itemValue);
};

export const getLocalItem = async key => {
  return await localforage.getItem(key);
};
