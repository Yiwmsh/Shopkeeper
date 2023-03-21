import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { ItemDisplayInput } from '../../pages/items/inputs/ItemDisplayInput';
import { IdentifiableObject } from '../../types/identifiableObject';

const MultiSelectListWrapper = styled.div`
  background-color: var(${SemanticColors.altText});
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const ItemsContainer = styled(motion.div)`
  display: flex;
  border-top: 1px solid black;
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
  const [search, setSearch] = React.useState('');
  const [selectedOnly, setSelectedOnly] = React.useState(false);
  return (
    <MultiSelectListWrapper>
      <Row>
        <ItemDisplayInput label="Search" value={search} onChange={setSearch} />
        <div>
          <label>Selected Only</label>
          <input
            type="checkbox"
            checked={selectedOnly}
            onChange={() => setSelectedOnly(!selectedOnly)}
          />
        </div>
      </Row>
      <ItemsContainer>
        {entries.map((entry) => {
          const isSelected = selectedEntries.some(
            (selectedEntry) => selectedEntry === entry.uid
          );
          if (!selectedOnly || isSelected) {
            if (search === '' || entry.name.includes(search)) {
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
                    onSelectionChange(
                      entry.uid,
                      isSelected ? 'unselect' : 'select'
                    )
                  }
                >
                  {entry.name}
                </MultiSelectListEntry>
              );
            }
          }
        })}
      </ItemsContainer>
    </MultiSelectListWrapper>
  );
};
