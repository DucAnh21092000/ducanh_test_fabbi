import { useState } from 'react';

const combineClassName = (...arg: (string | boolean)[]) => {
  const result = [];
  for (const item of arg) {
    if (typeof item === 'string' && item.trim()) {
      result.push(item);
    }
  }
  return result.join(' ');
};

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
}

const useBoolean = (initialValue?: boolean): [boolean, () => void, () => void, () => void] => {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const setTrue = () => {
    setIsTrue(true);
  };
  const setFail = () => {
    setIsTrue(false);
  };
  const toggleValue = () => {
    setIsTrue(!isTrue);
  };
  return [isTrue, setTrue, setFail, toggleValue];
};

const useUtils = () => {
  return {
    combineClassName,
    uuidv4,
    useBoolean,
  };
};
export default useUtils;
