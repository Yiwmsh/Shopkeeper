import { useQueryClient } from '@tanstack/react-query';
import { ItemSet } from '../../types';

export const useSaveSet = () => {
  const queryClient = useQueryClient();
  const ipcRenderer = (window as any).ipcRenderer;

  return async (set: ItemSet) => {
    ipcRenderer.invoke('saveSet', {
      set: set,
    });

    queryClient.invalidateQueries(['sets']);
  };
};
