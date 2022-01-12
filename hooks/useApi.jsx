export const getGetcher = (...args) =>
  axios.get(...args).then((res) => res.data.result)




  