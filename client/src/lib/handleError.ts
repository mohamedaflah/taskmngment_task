export const handleErrors = (error: any) => {
  if (error.response && error.response.data && error.response.data.message) {
    // Handle specific error message from the backend
    return error.response.data.message;
  } else {
    // Handle other types of errors (network, server not responding, etc.)
    return error.message;
  }
};
