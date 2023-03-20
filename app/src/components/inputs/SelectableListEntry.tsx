import { SemanticColors } from '@chrisellis/react-carpentry';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Button } from './Button';

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
`;

const ListItemDetails = styled.div`
  width: 40ch;
  height: 2em;
  line-height: 2em;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
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

export interface SelectableListEntryProps {
  onSelect: () => void;
  onDelete: () => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}

export const SelectableListEntry: React.FC<SelectableListEntryProps> = ({
  onSelect,
  onDelete,
  isSelected,
  children,
}) => {
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
        onClick={() => onSelect()}
      >
        <ListItemDetails> {children}</ListItemDetails>
      </ListItemButton>
      <Button
        onClick={() => {
          onDelete();
        }}
        buttonType="destructive"
        styles={css`
          height: 2em;
          padding: 5px 10px;
        `}
      >
        x
      </Button>
    </ItemRow>
  );
};
