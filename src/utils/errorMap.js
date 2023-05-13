const errorMap = {
  INVALID_FIELDS: 400,
  DUPLICATE_USER: 409,
  UNAUTHORIZED: 401,
};
const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};