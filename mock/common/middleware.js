/** Log for http request */
const logMiddleware = (request, response) => {
  console.info('================================================');
  console.info('Request URL:', request.path);
  console.info('Request Type:', request.method);
  console.info('Request Body:', request.body);
  console.info('Request Cookie:', request.cookies);
  console.info('Request Query:', request.query);
  console.info('Request Parameter:', request.params);
}

const fuck = () => {
  console.log('test');
}

module.exports = logMiddleware;
