import fetch from 'node-fetch';

export const send = async (auth, url, body, method) => {
  if (method !== 'post' && method !== 'get') throw new Error('wrong http method!');

  return fetch(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-access-key': auth.accessKey,
      'x-access-secret': auth.accessSecret,
    },
    body: body ? JSON.stringify(body) : undefined,
    method: method,
  });
};
