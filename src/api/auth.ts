import { api } from 'utils/api';

export const requestLogin = (params: any) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/users/login`,
    method: 'POST',
    params: params
  });
};

export const requestSignUp = (params: any) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/users/create`,
    method: 'POST',
    params: params
  });
};
