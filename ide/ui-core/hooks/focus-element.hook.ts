import { useEffect, useState } from 'react';

export const useFocusElement = <T extends HTMLElement>(ref: React.RefObject<T>) => {
  
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    function handleFocus() {
      const { current: element } = ref;
      setIsFocused(element === document.activeElement);
    }

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleFocus);
    };
  }, [ref.current])

  return isFocused;
}
