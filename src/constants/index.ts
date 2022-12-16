export const getInputType = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('inputType');
};
