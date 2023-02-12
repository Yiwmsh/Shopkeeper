import styled from '@emotion/styled';
import { displayValue } from '../../functions/currencyFunctions';
import { item } from './item';

const ItemRow = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 100%;
  gap: 10px;
`;

const ListItemName = styled.div`
  max-width: 20%;
  max-height: 1em;
  overflow: hidden;
`;

const ListItemPrice = styled.div``;

export const ListItem: React.FC<{
  item: item;
  onClick: (item: item) => void;
}> = ({ item, onClick }) => {
  return (
    <ItemRow onClick={() => onClick(item)}>
      <ListItemName>{item.name}</ListItemName>
      <ListItemPrice>{displayValue(item.value)}</ListItemPrice>
    </ItemRow>
  );
};
