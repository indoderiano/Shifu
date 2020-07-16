const crypto=require('crypto')

module.exports=(password)=>{
    return crypto.createHmac('sha256','puri').update(password).digest('hex')
}