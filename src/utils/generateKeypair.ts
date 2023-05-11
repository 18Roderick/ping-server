import crypto from "crypto";
import fs from "node:fs";
import * as path from "path";

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  // Create the public key file
  const config = path.join(__dirname, "../config");
  console.log(config);
  fs.writeFileSync(path.join(config, "/id_rsa_pub.pem"), keyPair.publicKey);

  // Create the private key file
  fs.writeFileSync(path.join(config, "/id_rsa_priv.pem"), keyPair.privateKey);
}

// Generate the keypair
genKeyPair();
