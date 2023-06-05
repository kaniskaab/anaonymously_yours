// Import the crypto-js library (you need to include the crypto-js library in your project)
const CryptoJS = require('crypto-js');

// Encryption function
function encrypt(message, secretKey) {
  // Convert the message and secret key to WordArrays
  const messageBytes = CryptoJS.enc.Utf8.parse(message);
  const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);
  
  // Encrypt the message using AES-256 with the secret key
  const encrypted = CryptoJS.AES.encrypt(messageBytes, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    keySize: 256 / 32
  });
  
  // Return the encrypted message as a base64-encoded string
  return encrypted.toString();
}

// Decryption function
function decrypt(encryptedMessage, secretKey) {
  // Convert the encrypted message and secret key to WordArrays
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedMessage);
  const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);
  
  // Decrypt the message using AES-256 with the secret key
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encryptedBytes },
    keyBytes,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 256 / 32
    }
  );
  
  // Convert the decrypted message to a UTF-8 string
  const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
  
  return decryptedMessage;
}

// // Example usage
// const secretKey = 'my-secret-key';
// const message = 'Hello, World!';

module.exports = {encrypt, decrypt}

// const encryptedMessage = encrypt(message, secretKey);
// console.log('Encrypted:', encryptedMessage);

// const decryptedMessage = decrypt(encryptedMessage, secretKey);
// console.log('Decrypted:', decryptedMessage);
