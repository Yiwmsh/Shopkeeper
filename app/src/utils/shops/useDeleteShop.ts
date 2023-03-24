import { useQueryClient } from '@tanstack/react-query';
import { Shop } from '../../types/shop';

export const useDeleteShop = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;
  return (shop: Shop) => {
    ipcRenderer.send('deleteShop', {
      shop: shop,
    });

    queryClient.invalidateQueries(['shops']);
  };
};
