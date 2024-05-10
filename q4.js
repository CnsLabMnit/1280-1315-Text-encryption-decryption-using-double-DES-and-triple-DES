const { decrypt, encrypt } = require('./q3');

const plaintext = 'encryption and decryption algorithm dhsdksds';
const encryptedData = encrypt(plaintext);
console.log("Encrypted:", encryptedData);

const decryptedData = decrypt(encryptedData);
console.log("Decrypted:", decryptedData);
