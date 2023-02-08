import localforage from 'localforage';

interface Localforage {
  [key: string]: any;
}

export const setLocalforage = (key: string, value: Localforage) => {
  return localforage.setItem(key, value);
};

export const getLocalItem = (key: string): Promise<Localforage | null> => {
  return localforage.getItem(key);
};
