import { useEffect, useState } from 'react';

//Find the one exactly linked to the message
const PREFIX = 'message-clone-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  //CODE TO GET VALUE FROM LOCAL STORAGE INTO STATE
  //Because getting values from local storage is slow, use function version of state.
  //   One do json once
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  //   GET VALUE AND SAVE INTO LOCAL STORAGE
  // Anytime key changes, overwrite old value
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  // Retuen 2 set useState values into local storagel
  return [value, setValue];
}
