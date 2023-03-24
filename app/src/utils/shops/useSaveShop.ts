import { useQueryClient } from '@tanstack/react-query';
import { Shop } from '../../types/shop';

export const useSaveShop = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;

  return async (shop: Shop) => {
    ipcRenderer.invoke('saveShop', {
      shop: shop,
    });

    queryClient.invalidateQueries(['shops']);
  };
};
