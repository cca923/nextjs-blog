export const apiRequest = ({ url, method }) => {
  return fetch(url, {
    method,
  });
};
