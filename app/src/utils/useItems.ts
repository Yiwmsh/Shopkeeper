import { useQuery } from '@tanstack/react-query';
import { Item } from '../types';

const loadItems = async (): Promise<Item[]> => {
  const ipcRenderer = (window as any).ipcRenderer;
  const result = await ipcRenderer.invoke('loadItems', {});
  try {
    const loadedItems = result as Item[];
    if (typeof loadedItems !== 'undefined') {
      return loadedItems;
    }
  } catch (e) {}

  return [];
};

export const useItems = () => {
  return useQuery({ queryKey: ['items'], queryFn: loadItems });
};
