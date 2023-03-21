import { useShops } from '../../utils/useShops';

export const ShopsLoader: React.FC = () => {
  const { data: shops, isLoading, isError, error } = useShops();

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return <></>;
};
