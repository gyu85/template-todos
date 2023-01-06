import localforage from 'localforage';

export const setLocalforage = (key, value) => localforage.setItem(key, value);

export const getLocalItem = async key => await localforage.getItem(key);
