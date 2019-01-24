import "whatwg-fetch";
import { stringify } from "query-string";

export const post = (url, params) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 0) {
        return res.data;
      }
      return Promise.reject(res.msg);
    })
    .catch(res => {
      console.log(res);
    });
};

export const get = (url, params = {}) => {
  return fetch(url + stringify(params))
    .then(res => res.json())
    .then(res => {
      if (res.status === 0) {
        return res.data;
      }
      return Promise.reject(res.msg);
    })
    .catch(res => {
      console.log(res);
    });
};
