import styled from '@emotion/styled';
import { item } from './item';

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ListItem: React.FC<{ item: item }> = ({ item }) => {
  return <ItemRow>{item.name}</ItemRow>;
};
