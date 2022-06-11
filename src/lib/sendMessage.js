import { BASE_URL, APP_VERSION } from "../constants/url.js";
import { makeUrl, makeSenderUrl, makeSearchParamsUrl } from "./utils.js";
import { send } from "./fetch.js";

export const sendMessage = (sender, senderId, additionalPath, searchParams, body, method) => {
  const urlWithSender = makeSenderUrl(makeUrl(BASE_URL, APP_VERSION), sender);
  const urlWithSenderId = senderId ? `${urlWithSender}/${String(senderId)}` : urlWithSender;
  const urlWithPath = additionalPath ? `${urlWithSenderId}/${additionalPath}` : urlWithSenderId;
  const url = makeSearchParamsUrl(urlWithPath, searchParams);

  try {
    const response = await send(url, body, method);
    console.log(response.json());
    return response;
  } catch (err) {
    console.log(`${sender} failed to ${method} message ` + err);
  }
};
