'use strict';
const crypto = require('crypto');

const KEY1 = Buffer.from('0123456789abcdef', 'hex'); // 8-byte key
const KEY2 = Buffer.from('fedcba9876543210', 'hex'); // 8-byte key
const KEY3 = Buffer.from('02468ace13579bdf', 'hex'); // 8-byte key
const IV_LENGTH = 8; // For Triple DES, this is 8

function encrypt(text) {
    try {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('des-ede3-cbc', Buffer.concat([KEY1, KEY2, KEY3]), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
}
  
function decrypt(text) {
    try {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('des-ede3-cbc', Buffer.concat([KEY1, KEY2, KEY3]), iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

module.exports = { decrypt, encrypt };
