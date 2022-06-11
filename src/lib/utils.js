export const makeUrl = (url, appVersion) => {
  return `${url}/open/${appVersion}`;
};

export const makeSenderUrl = (url, sender) => {
  return `${url}/${sender}`;
};

export const makeSearchParamsUrl = (url, searchParams) => {
  if (searchParams == undefined) return url;
  if (searchParams.constructor !== Object) console.log('searchParams should be object type!');

  const keys = Object.keys(searchParams);
  let urlWithSearchParams = `${url}?${String(keys[0])}=${String(searchParams[keys[0]])}`;

  if (keys.length > 1) {
    keys.map((key, i) => {
      if (i > 0) {
        const query = `&${key}=${String(searchParams[key])}`;
        urlWithSearchParams += query;
      }
    });
  }

  return urlWithSearchParams;
};
