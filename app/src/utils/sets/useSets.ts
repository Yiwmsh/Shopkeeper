import { useQuery } from '@tanstack/react-query';
import { ItemSet } from '../../types';

const loadSets = async (): Promise<ItemSet[]> => {
  const ipcRenderer = (window as any).ipcRenderer;
  const result = await ipcRenderer.invoke('loadSets', {});
  try {
    const loadedSets = result as ItemSet[];
    if (typeof loadedSets !== 'undefined') {
      return loadedSets;
    }
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const useSets = () => {
  return useQuery({ queryKey: ['sets'], queryFn: loadSets });
};
