import { useShops } from '../../utils/useShops';
import { ShopsPage } from './ShopsPage';

export const ShopsLoader: React.FC = () => {
  const { data: shops, isLoading, isError, error } = useShops();

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return <ShopsPage loadedShops={shops} />;
};
