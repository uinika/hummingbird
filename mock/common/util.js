const JsonLoader = require('load-json-file');

/** Basic path */
exports.Path = (url) => {
  return __dirname + url
};

/** Json loader */
exports.Json = name => {
  return JsonLoader.sync(__dirname  + name);
};

/** Protocal between server & client */
exports.Protocal = (head, body) => {
  head = head || {};
  body = body || {};
  return {
    "head": {
      "status": head.status || '',
      "token": head.token || '',
      "message": head.message || '',
      "total": head.total || ''
    },
    "body": body || ''
  }
};
