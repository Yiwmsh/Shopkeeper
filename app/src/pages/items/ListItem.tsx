import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { displayValue } from '../../functions/currencyFunctions';
import { Item } from './item';

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
`;
const ListItemButton = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 0;
  border: none;
  margin-bottom: 5px;
  height: 2em;
`;

const ListItemName = styled.div`
  width: 20ch;
  height: 2em;
  line-height: 2em;
  overflow: hidden;
`;

const ListItemPrice = styled.div`
  width: 20ch;
  height: 2em;
  line-height: 2em;
  overflow: hidden;
`;

const DeleteItemButton = styled(motion.button)`
  background-color: var(${SemanticColors.error});
  color: var(${SemanticColors.altText});
  border: none;
  height: 2em;
  padding: 5px 10px;
`;

export const ListItem: React.FC<{
  item: Item;
  onSelect: (item: Item) => void;
  onDelete: (itemID: string) => void;
  isSelected?: boolean;
}> = ({ item, onSelect, onDelete, isSelected }) => {
  return (
    <ItemRow>
      <ListItemButton
        initial={{
          backgroundColor: `var(${SemanticColors.altText})`,
        }}
        animate={{
          backgroundColor: isSelected
            ? `var(${SemanticColors.primary})`
            : `var(${SemanticColors.altText})`,

          color: isSelected
            ? `var(${SemanticColors.altText})`
            : `var(${SemanticColors.text})`,
        }}
        whileHover={{
          backgroundColor: `var(${SemanticColors.primaryActive})`,
          color: `var(${SemanticColors.altText})`,
        }}
        whileTap={{
          backgroundColor: `var(${SemanticColors.primaryDisabled})`,
          color: `var(${SemanticColors.altText})`,
        }}
        transition={{ duration: 0.2 }}
        onClick={() => onSelect(item)}
      >
        <ListItemName>{item.name}</ListItemName>
        <ListItemPrice>{displayValue(item.value)}</ListItemPrice>
      </ListItemButton>
      <DeleteItemButton
        onClick={() => {
          onDelete(item.uid);
        }}
        whileHover={{
          filter: `contrast(2)`,
        }}
      >
        x
      </DeleteItemButton>
    </ItemRow>
  );
};
