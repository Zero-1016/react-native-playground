import useLegendStore from '@/store/useLegendStore';
import {useEffect} from 'react';
import {getEncryptStorage, setEncryptStorage} from '@/utils';
import {storageKeys} from '@/constants';

function useLegendStorage() {
  const {isVisible, setIsVisible} = useLegendStore();

  const set = async (flag: boolean) => {
    await setEncryptStorage(storageKeys.SHOW_LEGEND, flag);
    setIsVisible(flag);
  };

  useEffect(() => {
    (async () => {
      const storedData =
        (await getEncryptStorage(storageKeys.SHOW_LEGEND)) ?? false;
      setIsVisible(storedData as boolean);
    })();
  }, [setIsVisible]);

  return {set, isVisible};
}

export default useLegendStorage;
