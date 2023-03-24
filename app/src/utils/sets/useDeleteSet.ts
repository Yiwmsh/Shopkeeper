import { useQueryClient } from '@tanstack/react-query';
import { ItemSet } from '../../types';

export const useDeleteSet = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;
  return (set: ItemSet) => {
    ipcRenderer.send('deleteSet', {
      set: set,
    });

    queryClient.invalidateQueries(['sets']);
  };
};
