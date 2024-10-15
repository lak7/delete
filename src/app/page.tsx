"use client";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";

export default function Home() {
  const [keyPairs, setKeyPairs] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);

  useEffect(() => {
    // Generate 100 key pairs
    const generatedKeys = [];
    for (let i = 0; i < 1; i++) {
      const keyPair = nacl.sign.keyPair();

      // Convert to hex format
      const publicKeyHex = Buffer.from(keyPair.publicKey).toString("hex");
      const privateKeyHex = Buffer.from(keyPair.secretKey).toString("hex");

      // Push the key pair to the array
      generatedKeys.push({
        publicKey: publicKeyHex,
        privateKey: privateKeyHex,
      });
    }

    // Set the keys in state
    setKeyPairs(generatedKeys);
  }, []);

  // Function to copy a single key pair
  const copyToClipboard = (publicKey: string, privateKey: string) => {
    const copyText = `Public Key: 0x${publicKey}\nPrivate Key: ${privateKey}`;
    navigator.clipboard.writeText(copyText);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">
        Generated 100 Ed25519 Key Pairs
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {keyPairs.map((keyPair, index) => (
          <div
            key={index}
            className="p-4 border rounded-md shadow-md bg-gray-100 dark:bg-gray-800"
          >
            <p>
              <strong>Public Key {index + 1}:</strong> 0x{keyPair.publicKey}
            </p>
            <p>
              <strong>Private Key {index + 1}:</strong> {keyPair.privateKey}
            </p>
            <button
              onClick={() =>
                copyToClipboard(keyPair.publicKey, keyPair.privateKey)
              }
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Copy Keys
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
