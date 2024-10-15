import { useRef, useEffect } from 'react';

export function getSectionData(data) {
  const categories = [...new Set(data.map((menuItem) => menuItem.category))];
  return categories;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
