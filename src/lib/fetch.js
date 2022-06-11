import fetch from 'node-fetch';
import { auth } from '../config/auth.js';

export const send = async (url, body, method) => {
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
