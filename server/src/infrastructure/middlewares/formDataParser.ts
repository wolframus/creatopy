import { decryptText } from '../../utils/functions';
import { parseStringifiedFormDataFields } from '../../utils/functions';

type TParsers =
  | 'toLowerCase'
  | 'toObjectList'
  | 'toNumberList'
  | 'decrypt'
  | 'removeIfNotExists';

type TParseFieldsProps<T> = {
  [key in TParsers]?: (keyof T[keyof T])[];
};

type TType<T> = {
  [key in keyof T]: TParseFieldsProps<T>;
};

const PRIORITY_LIST: TParsers[] = [
  'removeIfNotExists',
  'decrypt',
  'toObjectList',
  'toNumberList',
  'toLowerCase',
];

export const parseFields =
  <T>(object: TType<T>) =>
  async (req: any, res: any, next: any) => {
    try {
      const keys: any = Object.keys(object);

      for (let i = 0; i < keys.length; i++) {
        const firstLevelKey: keyof T = keys[i];
        const firstLevelObject: any = object[firstLevelKey];

        const parsedObject: any = {};

        PRIORITY_LIST.forEach((item) => {
          if (firstLevelObject[item]) {
            parsedObject[item] = firstLevelObject[item];
          }
        });

        const entries: any = Object.entries(parsedObject);

        for (let ii = 0; ii < entries.length; ii++) {
          const [actionType, fieldsToParse]: [TParsers, any[]] = entries[ii];

          if (!fieldsToParse?.length) {
            continue;
          }

          if (actionType === 'removeIfNotExists') {
            fieldsToParse.forEach((itemKey) => {
              if (!itemKey || !req[firstLevelKey][itemKey!]) {
                delete req[firstLevelKey][itemKey];
              }
            });
          }

          if (actionType === 'decrypt') {
            fieldsToParse.forEach((itemKey) => {
              if (itemKey && req[firstLevelKey][itemKey!]) {
                const value = req[firstLevelKey][itemKey!] || '';

                const decryptedValue = decryptText(value);

                req[firstLevelKey][itemKey] = decryptedValue;
              } else {
                req[firstLevelKey][itemKey] = undefined;
              }
            });
          }

          if (actionType === 'toObjectList') {
            const payload = parseStringifiedFormDataFields(
              req[firstLevelKey],
              fieldsToParse
            );

            req[firstLevelKey] = {
              ...req[firstLevelKey],
              ...payload,
            };
          }

          if (actionType === 'toNumberList') {
            fieldsToParse.forEach((itemKey) => {
              if (firstLevelObject[actionType]?.length) {
                const value = req[firstLevelKey][itemKey];

                if (value) {
                  const parsedValue = parseFloat(value);
                  const isNan = Number.isNaN(parsedValue);

                  const finalValue = isNan ? 0 : parsedValue;

                  req[firstLevelKey][itemKey] = finalValue;
                } else {
                  req[firstLevelKey][itemKey] = undefined;
                }
              } else {
                req[firstLevelKey][itemKey] = undefined;
              }
            });
          }

          if (actionType === 'toLowerCase') {
            fieldsToParse.forEach((itemKey) => {
              if (firstLevelObject[actionType]?.length) {
                req[firstLevelKey][itemKey] =
                  req[firstLevelKey][itemKey].toLowerCase();
              } else {
                req[firstLevelKey][itemKey] = undefined;
              }
            });
          }
        }
      }

      next();
    } catch (err: any) {
      console.error('Error on fieldDeCryptRrs.ts', err.message);
      res.status(500).send();
    }
  };
