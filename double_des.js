'use strict';
const crypto = require('crypto');

const ENCRYPTION_KEY = '0fXaXkZo7mtE9sQS'; // 16-byte key for Double DES
const IV_LENGTH = 8; // For Double DES, this is 8

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('des-ede-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
  
    encrypted = Buffer.concat([encrypted, cipher.final()]);
  
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
  
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('des-ede-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
  
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  
    return decrypted.toString();
}

module.exports = { decrypt, encrypt };
