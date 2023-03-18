import { ItemSet } from './itemSet';

export const ListSet: React.FC<{ set: ItemSet }> = ({ set }) => {
  return <>{set.name}</>;
};
