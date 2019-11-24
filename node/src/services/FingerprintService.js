const Fingerprint = require('../models/Fingerprint')

let FingerprintService = new Object

FingerprintService.createFingerprint = async (fid) => {
    let fingerprint = new Fingerprint({
        fid: fid
    }) 
    await fingerprint.save()
}

FingerprintService.getFingerprint = async () => {
    let fingerprint = Fingerprint.find({}).select('-_id -__v')
    if(!fingerprint) throw new Error (`Couldn't find any fingerprints`)
    return fingerprint
}

FingerprintService.cleanFingerprint = async () => {
    let fingerprint = Fingerprint.find({}).select('-_id -__v')
    fingerprint = Fingerprint.deleteMany()
    if(!fingerprint) throw new Error (`Couldn't find any fingerprints`)
    return fingerprint
}

module.exports = FingerprintService