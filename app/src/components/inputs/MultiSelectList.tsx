import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { ItemDisplayInput } from '../../pages';
import { IdentifiableObject } from '../../types';
import { Button } from './Button';

const MultiSelectListWrapper = styled.div<{ maxHeight?: string }>`
  background-color: var(${SemanticColors.altText});
  width: 445px;
  max-height: ${({ maxHeight = '145px' }) => maxHeight};
  border: 1px solid black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const EntriesContainer = styled(motion.div)`
  border-top: 1px solid black;
  padding: 5px;
  overflow-y: scroll;
  max-height: auto;
`;

const EntriesList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
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
    selectedEntries: string[],
    selectionState: 'select' | 'unselect'
  ) => void;
  maxHeight?: string;
}

export const MultiSelectList: React.FC<MultiSelectListProps> = ({
  entries,
  selectedEntries,
  onSelectionChange,
  maxHeight,
}) => {
  const [search, setSearch] = React.useState('');
  const [selectedOnly, setSelectedOnly] = React.useState(false);
  const [filteredEntries, setFilteredEntries] = React.useState<
    IdentifiableObject[]
  >([]);

  React.useEffect(() => {
    if (search === '') {
      setFilteredEntries(
        selectedOnly
          ? entries.filter((entry) =>
              selectedEntries.some(
                (selectedEntry) => selectedEntry === entry.uid
              )
            )
          : entries
      );
    } else {
      setFilteredEntries(
        entries.filter(
          (entry) =>
            (!selectedOnly ||
              selectedEntries.some(
                (selectedEntry) => entry.uid === selectedEntry
              )) &&
            (entry.name.toLowerCase().includes(search.toLowerCase()) ||
              search
                .toLowerCase()
                .split(' ')
                .every((searchTag) =>
                  entry.tags?.some((entryTag) => entryTag.includes(searchTag))
                ))
        )
      );
    }
  }, [entries, search, selectedOnly]);
  return (
    <MultiSelectListWrapper maxHeight={maxHeight}>
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
        <Button
          buttonType="constructive"
          onClick={() => {
            onSelectionChange(
              filteredEntries.map((entry) => entry.uid),
              'select'
            );
          }}
        >
          Add All
        </Button>
        <Button
          buttonType="destructive"
          onClick={() =>
            onSelectionChange(
              filteredEntries.map((entry) => entry.uid),
              'unselect'
            )
          }
        >
          Clear
        </Button>
      </Row>
      <EntriesContainer>
        <EntriesList>
          {filteredEntries.map((entry) => {
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
                  onSelectionChange(
                    [entry.uid],
                    isSelected ? 'unselect' : 'select'
                  )
                }
              >
                {entry.name}
              </MultiSelectListEntry>
            );
          })}
        </EntriesList>
      </EntriesContainer>
    </MultiSelectListWrapper>
  );
};
