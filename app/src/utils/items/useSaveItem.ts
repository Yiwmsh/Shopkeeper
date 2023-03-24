import { useQueryClient } from '@tanstack/react-query';
import { Item } from '../../types';

export const useSaveItem = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;

  return async (item: Item) => {
    ipcRenderer.invoke('saveItem', {
      item: item,
    });

    queryClient.invalidateQueries(['items']);
  };
};
