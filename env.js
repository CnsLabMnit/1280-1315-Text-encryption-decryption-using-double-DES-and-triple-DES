const { decrypt, encrypt } = require('./double_des');

const plaintext = 'encryption and decryption algorithm For projecct ';
const encryptedData = encrypt(plaintext);
console.log("Encrypted:", encryptedData);

const decryptedData = decrypt(encryptedData);
console.log("Decrypted:", decryptedData);
