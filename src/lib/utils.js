export const makeUrl = (url, appVersion) => {
  return `${url}/open/${appVersion}`;
};

export const makeSenderUrl = (url, sender) => {
  return `${url}/${sender}`;
};

export const makeSearchParamsUrl = (url, searchParams) => {
  if (searchParams.constructor !== Object) throw new Error('searchParams should be object type!');
  if (searchParams == undefined) return url;

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
