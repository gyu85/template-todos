import { getLocalItem } from 'utils/localforage';

export const api = async function ({ url, method, params }) {
  const token = await getLocalItem('token');

  try {
    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? token : null
      },
      body:
        (method || '').match(/POST/) && params ? JSON.stringify(params) : null,
      credentials: 'omit'
    });

    const { status } = response;

    if (status >= 400 && status < 500) {
      throw await response.json();
    } else if (status >= 500) {
      const errorMessage = { details: 'Server Error' };
      throw errorMessage;
    } else {
      return response.json();
    }
  } catch (error) {
    throw new Error(`${error.details}`).message;
  }
};
