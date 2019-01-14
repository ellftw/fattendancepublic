/* eslint-disable indent */

export default {
  sleep: async function (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
}
