export const createError = (status, message) => {
    const err = new Error(message); // Set the message while creating the error
    err.status = status;           // Assign the status property
    return err;                    // Return the error object
  };