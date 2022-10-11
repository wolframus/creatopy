import Crypto from 'crypto-js';

import CONFIG from '../common/config';

export const encryptText = (text: string) =>
  Crypto.AES.encrypt(text, CONFIG.ENCRYPTION_TEXT_SLUG).toString();

export const encryptEachObjectValue = (object: any = {}) => {
  const entries = Object.entries(object);

  const encryptedData: any = {};
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const encryptedValue = encryptText((value as string | null) || '');
    encryptedData[key] = encryptedValue;
  }

  return encryptedData;
};
