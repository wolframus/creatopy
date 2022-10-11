type TKeys = 'token';

class LocalStorage {
  get = (key: TKeys) => localStorage.getItem(key);

  delete = (key: TKeys) => localStorage.removeItem(key);

  set = (key: TKeys, value: string) => localStorage.setItem(key, value);
}

export default new LocalStorage();
