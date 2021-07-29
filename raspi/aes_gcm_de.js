// const crypto = require('crypto');


// const mode = 'aes-256-gcm';

// let key = Buffer.from("abcbbbbbbbbbbbbbabcbbbbbbbbbbbbb", 'utf-8')

// let tag;

// function decrypt(text) {
//     let textParts = text.split(':');
//     let iv = Buffer.from(textParts.shift(), 'hex');
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//     let decipher = crypto.createDecipheriv(mode, key, iv);

//     decipher.setAuthTag(tag);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     return decrypted.toString();
// }

// console.log(decrypt("254686d703a421899e8b1648:2b26bef1"))

const crypto = require('crypto');


const mode = 'aes-256-gcm';
// 因為aes-256要求之key 長度為256bits 也就是32 bytes = 32個ASCII英文字母
// aes-128 要求之key 長度為128bits 也就是16 bytes = 16個英文字母
let key = Buffer.from("abcbbbbbbbbbbbbbabcbbbbbbbbbbbbb", 'utf-8') //or crypto.randomBytes(32);

const IV_LENGTH = 12;
let tag;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);

    let cipher = crypto.createCipheriv(mode, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // 需要加上AuthTag
    tag = cipher.getAuthTag();
    // 將IV附上 在解密時須告知
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    console.log('--------')
    console.log(text)
    console.log('--------=')
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(mode, Buffer.from(key), iv);
    // 需要加上AuthTag
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted.toString();
}

console.log(encrypt("test"));
console.log(decrypt(encrypt("test")))