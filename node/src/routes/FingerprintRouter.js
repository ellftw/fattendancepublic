const fingerprintRouter = require('express').Router()
const FingerprintService = require('../services/FingerprintService')

fingerprintRouter.get('/', async(request, response) => {
    try {
       let fingerprint = await FingerprintService.getFingerprint()
        response.status(200).json({ success: true, fingerprint: fingerprint })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

fingerprintRouter.post('/create/:fid', async (request, response) => {
    try {
        
        let fingerprint = await FingerprintService.createFingerprint(request.params.fid)
        response.status(200).json({ success:true, fingerprint: fingerprint })
    } catch(error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

fingerprintRouter.post('/delete', async (request, response) => {
    try {
        await FingerprintService.cleanFingerprint()
        response.status(200).json({ success:true })
    } catch (error) {
        response.status(200).json({ success: false, error: `${error}` })
    }
})

module.exports = fingerprintRouter