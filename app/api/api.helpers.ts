export function getContentType() {
  return {
    'Content-Type': `application/json`,
  };
}

export function errorCatch(error: any) {
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === `object`)
      return error.response.data.message[0];
    return error.response.data.message;
  } else return error.message;
}
