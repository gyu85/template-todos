import { getLocalItem } from 'utils/localforage';

interface IApiParameter {
  url: string;
  method: string;
  params?: any;
}

const getHeaders = async () => {
  return await getLocalItem('userTodoInfo').then((item: any) => {
    if (item?.token) {
      return item.token;
    } else {
      return null;
    }
  });
};

export const api = async function ({ url, method, params }: IApiParameter) {
  const token = await getHeaders();

  try {
    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body:
        (method || '').match(/POST|PUT/) && params
          ? JSON.stringify(params)
          : null,
      credentials: 'omit'
    });

    const { status } = response;

    if (status >= 400 && status < 500) {
      throw await response.json();
    } else if (status >= 500) {
      throw new Error('Server Error');
    } else {
      return response.json();
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`${error}`).message;
    } else {
      throw error.details;
    }
  }
};
