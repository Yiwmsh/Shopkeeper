import { useQuery } from '@tanstack/react-query';
import { Shop } from '../../types/shop';

const loadShops = async (): Promise<Shop[]> => {
  const ipcRenderer = (window as any).ipcRenderer;
  const result = await ipcRenderer.invoke('loadShops', {});
  try {
    const loadedShops = result as Shop[];
    if (typeof loadedShops !== 'undefined') {
      return loadedShops;
    }
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const useShops = () => {
  return useQuery({ queryKey: ['shops'], queryFn: loadShops });
};
