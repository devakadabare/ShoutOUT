const errorStatus = {

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  DUPLICATED: 409,
  SERVER_ERROR: 500,
  CREATED: 201,
  SUCCESS: 200,
  UPDATED: 204
};

const errorMessages = (status, field) => {
  let message = '';
  switch (status) {
    case 400: message = 'bad request';
      break;
    case 401: message = 'unauthorized';
      break;
    case 403: message = 'forbidden';
      break;
    case 404: message = field + ' not found';
      break;
    case 409: message = field + ' already exist';
      break;
    case 500: message = 'internal server error';
      break;
    case 200: message = 'success';
      break;
    case 201: message = field + ' successfully updated';
      break;
    case 204: message = ' action completed';
      break;
  }
};

module.exports = {
  errorStatus,
  errorMessages
};