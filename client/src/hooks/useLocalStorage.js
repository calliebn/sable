import { useEffect, useState } from 'react';

//Find the one exactly linked to the message
const PREFIX = 'message-clone-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  //Because getting values from local storage is slow, use function version of state.
  //   One do json once
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue) return JSON.parse(jsonValue);
  });
}
