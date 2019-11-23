import axios from 'axios'

const FingerprintService = {
  createFingerprint: async function (fid) {
    let response = await axios.post(`http://0.0.0.0:8080/fingerprint/create`,
      {
        fid: fid
      })
    return response.data
  },
  getFingerprint: async function () {
    let response = await axios.get(`http://0.0.0.0:8080/fingerprint/`)
    return response.data.fingerprints
  },
  cleanFingerprint: async function () {
    let response = await axios.post(`http://0.0.0.0:8080/fingerprint/delete`)
    return response.data
  }
}

export default FingerprintService
