import localforage from 'localforage';

export const setLocalforage = (key: string, value: string | any) => {
  return localforage.setItem(key, value);
};

export const getLocalItem = async (key: string) => {
  return await localforage.getItem(key);
};
