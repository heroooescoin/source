const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
const SHA256 = require("crypto-js/sha256");

class ChainUtil {
  static genKeyPair(secret) {
    return eddsa.keyFromSecret(secret);
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    console.log(publicKey);
    console.log(signature);
    console.log(dataHash);
    return eddsa.keyFromPublic(publicKey).verify(dataHash, signature);
  }
}

module.exports = ChainUtil;
