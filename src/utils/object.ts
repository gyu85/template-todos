import { capitalToDash } from './string';

interface cssProperties {
  [property: string]: string;
}

export const changeStringToObject = (string: string) => {
  return JSON.parse(string);
};

export const cssPropertyChange = (object: cssProperties): cssProperties => {
  let style: cssProperties = {};

  for (let props in object) {
    style[capitalToDash(props)] = object[props];
  }

  return style;
};
