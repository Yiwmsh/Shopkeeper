import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Button, SelectableListEntry } from '../../components';
import { DEFAULT_ITEM } from '../../consts';
import { displayValue } from '../../functions';
import { Item } from '../../types';
import { useDeleteItem, useSaveItem } from '../../utils';
import { ItemDisplay } from './ItemDisplay';
import { Input } from './inputs';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ItemsListCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70vh;
`;

export const ItemsPage: React.FC<{ loadedItems: Item[] }> = ({
  loadedItems,
}) => {
  const saveItem = useSaveItem();
  const deleteItem = useDeleteItem();
  const [items, setItems] = React.useState<Item[]>(loadedItems);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState('');
  const [defaultItem, setDefaultItem] = React.useState<Item>({
    ...DEFAULT_ITEM,
  });

  return (
    <ItemsContainer>
      <ItemDisplay
        onDefaultChanged={setDefaultItem}
        defaultItem={defaultItem}
        item={selectedItem ?? defaultItem}
        saveItem={saveItem}
        deleteItem={deleteItem}
      />

      <ItemsListCol>
        <Button
          onClick={() => {
            setSelectedItem(undefined);
          }}
          buttonType="constructive"
          styles={css`
            margin: 10px auto;
            padding: 5px 10px;
            font-size: 20px;
          `}
        >
          +{' '}
        </Button>
        <Input label="Search" value={search} onChange={setSearch} />
        <ItemsList>
          {loadedItems.map((item) => {
            if (
              search === '' ||
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              search
                .toLowerCase()
                .split(' ')
                .every((searchTag) =>
                  item.tags?.some((tag) => tag.includes(searchTag))
                )
            ) {
              return (
                <SelectableListEntry
                  onSelect={() => setSelectedItem(item)}
                  onDelete={() => deleteItem(item)}
                  isSelected={selectedItem === item}
                >
                  <div>{item.name}</div>
                  <div>{displayValue(item.value, 'long')}</div>
                </SelectableListEntry>
              );
            }
          })}
        </ItemsList>
      </ItemsListCol>
    </ItemsContainer>
  );
};
