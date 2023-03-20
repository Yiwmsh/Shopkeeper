import { useItems } from '../../utils/useItems';
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
