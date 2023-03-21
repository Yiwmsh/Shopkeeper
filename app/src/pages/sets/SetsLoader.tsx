import { useSets } from '../../utils';
import { SetsPage } from './SetsPage';

export const SetsLoader: React.FC = () => {
  const { data: loadedSets, isLoading, isError, error } = useSets();

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return <SetsPage loadedSets={loadedSets} />;
};
