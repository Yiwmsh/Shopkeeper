import { useQueryClient } from '@tanstack/react-query';
import { Item } from '../../types';

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;
  return (item: Item) => {
    ipcRenderer.send('deleteItem', {
      item: item,
    });

    queryClient.invalidateQueries(['items']);
  };
};
