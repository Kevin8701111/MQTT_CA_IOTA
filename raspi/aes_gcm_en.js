const crypto = require('crypto');
const { type } = require('os');


const mode = 'aes-256-gcm';
let key = crypto.randomBytes(32);

const IV_LENGTH = 12;
let tag;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    console.log(iv,'33333uvbjhbj')
    let cipher = crypto.createCipheriv(mode, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    tag = cipher.getAuthTag();
    console.log('---------------')
    console.log(tag,'kkkkkkkkkkkkkkk')
    console.log(typeof(iv.toString('hex') + ':' + encrypted.toString('hex')));
    console.log(key,'555555')
    console.log('---------------')
    // key iv
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// function decrypt(text) {
//     let textParts = text.split(':');
//     let iv = Buffer.from(textParts.shift(), 'hex');
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//     let decipher = crypto.createDecipheriv(mode, key, iv);
//     let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
//     console.log(iv,'3333333333')
//     console.log(tag,'222222222222222')
//     decipher.setAuthTag(Buffer.from(Buffer.from['5f 06 ac 6f 9e 3e 20 f1 6b 98 0a 3c 19 b5 98 7e'], 'hex'));
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     return decrypted.toString();
// }
console.log(encrypt("test"));
// console.log(decrypt(encrypt("test")))