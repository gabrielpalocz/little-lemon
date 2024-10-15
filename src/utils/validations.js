export const validateNameEmpty = (firstName) => {
  return !!(
    firstName &&
    firstName.trim().length > 0 &&
    /^[A-Za-z\s]+$/.test(firstName)
  );
};

export const validateEmail = (email) => {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
