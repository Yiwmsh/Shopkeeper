import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { IdentifiableObject } from '../../types/identifiableObject';

const MultiSelectListContainer = styled.div`
  display: flex;
  background-color: var(${SemanticColors.altText});
  border: 1px solid black;
  padding: 5px;
  gap: 5px;
  width: 435px;
  flex-wrap: wrap;
`;

const MultiSelectListEntry = styled(motion.button)<{ selected?: boolean }>`
  border-radius: 0px;
  border: 1px solid black;
  background-color: var(${SemanticColors.altText});
`;
export interface MultiSelectListProps {
  entries: IdentifiableObject[];
  selectedEntries: string[];
  onSelectionChange: (
    selectedEntry: string,
    selectionState: 'select' | 'unselect'
  ) => void;
}

export const MultiSelectList: React.FC<MultiSelectListProps> = ({
  entries,
  selectedEntries,
  onSelectionChange,
}) => {
  React.useEffect(() => {}, [selectedEntries]);
  return (
    <MultiSelectListContainer>
      {entries.map((entry) => {
        const isSelected = selectedEntries.some(
          (selectedEntry) => selectedEntry === entry.uid
        );
        return (
          <MultiSelectListEntry
            selected={isSelected}
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
            onClick={() =>
              onSelectionChange(entry.uid, isSelected ? 'unselect' : 'select')
            }
          >
            {entry.name}
          </MultiSelectListEntry>
        );
      })}
    </MultiSelectListContainer>
  );
};
