import { useItems } from '../../utils';
import { ItemsPage } from './ItemsPage';

export const ItemLoader: React.FC = () => {
  const { isLoading, isError, data: loadedItems, error } = useItems();

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>{error}</>;
  }

  return <ItemsPage loadedItems={loadedItems} />;
};
