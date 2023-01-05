import { api } from 'utils/api';
import { APIURL } from 'utils/constant';

export const requestLogin = params => {
  return api({
    url: `${APIURL}/users/login`,
    method: 'POST',
    params: params
  });
};

export const requestSignUp = params => {
  return api({
    url: `${APIURL}/users/create`,
    method: 'POST',
    params: params
  });
};
