import React from 'react';
import { useItems } from './useItems';

export const useTags = () => {
  const { data: items } = useItems();

  return React.useMemo(() => {
    const tags: string[] = [];
    if (!items) {
      return tags;
    }
    const tagsSet = new Set(items?.map((item) => item.tags).flat());
    tagsSet.forEach((tag) => {
      if (tag) {
        tags.push(tag);
      }
    });
    return tags;
  }, [items]);
};
