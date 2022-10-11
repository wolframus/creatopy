import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cryptoJs from 'crypto-js';

import CONFIG from '../config';

export const encryptText = (text: string) =>
  cryptoJs.AES.encrypt(text, CONFIG.ENCRYPT_TEXT_KEY).toString();

export const generateRandomDigits = async (numberOfDigits = 6) => {
  const code = await new Promise((resolve) =>
    crypto.randomBytes(3, (err, buffer) => {
      const generatedCode = parseInt(buffer.toString('hex'), 16)
        .toString()
        .substring(0, numberOfDigits);
      resolve(generatedCode);
    })
  );

  return code as string;
};

export const doesEncryptedTextMatch = (text: string, encryptedText: string) => {
  const decryptedText = decryptText(encryptedText);

  return text === decryptedText;
};

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, CONFIG.ENCRYPTED_PASSWORD_SALT);

export const doesPasswordMatch = async (
  password: string,
  hashedPassword: string
) => bcrypt.compare(password, hashedPassword);

export const createUserToken = (payload: any) => {
  payload = payload.toJSON ? payload.toJSON() : payload;

  const token = jwt.sign(payload, CONFIG.TOKEN_SECRET_KEY);
  return token;
};

export const verifyUserToken = (token: string) =>
  jwt.verify(token, CONFIG.TOKEN_SECRET_KEY);

export const decryptText = (text: string) => {
  const bytes = cryptoJs.AES.decrypt(text, CONFIG.ENCRYPT_TEXT_KEY);
  return bytes.toString(cryptoJs.enc.Utf8);
};

export const parseStringifiedFormDataFields = <T>(
  payload: T,
  fields: (keyof T)[]
) => {
  const response = payload;

  fields.forEach((field) => {
    const currentValue = payload[field];

    if (currentValue && typeof currentValue === 'string') {
      response[field] = JSON.parse(currentValue);
    }
  });

  return response;
};
