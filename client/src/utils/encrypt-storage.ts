import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const getEncryptStorage = async <T>(key: string): Promise<T | null> => {
  const data = await EncryptedStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const removeEncryptStorage = async (key: string) => {
  const data = getEncryptStorage(key);
  if (data !== null) {
    await EncryptedStorage.removeItem(key);
  }
};

export {setEncryptStorage, getEncryptStorage, removeEncryptStorage};
