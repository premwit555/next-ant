export const handleResponseError = (error) => {
  if (error?.response?.data?.error) {
    throw error.response.data.error
  }
  throw error
}
