import localforage from 'localforage';

export const setLocalforage = (key, value) => localforage.setItem(key, value);
