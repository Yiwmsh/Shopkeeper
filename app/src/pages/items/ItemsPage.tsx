import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Button, SelectableListEntry } from '../../components';
import { displayValue } from '../../functions';
import { Item } from '../../types';
import { ItemDisplay } from './ItemDisplay';
import { ItemDisplayInput } from './inputs';

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
  const ipcRenderer = (window as any).ipcRenderer;
  const [items, setItems] = React.useState<Item[]>(loadedItems);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState('');

  const saveItem = (item: Item) => {
    let newItems = [];
    const matchingItem = items.filter((arrItem) => arrItem.uid === item.uid);
    if (matchingItem.length < 1) {
      newItems = [item, ...items];
    } else {
      const otherItems = items.filter((arrItem) => arrItem.uid !== item.uid);
      newItems = [item, ...otherItems];
    }
    ipcRenderer.send('saveItems', {
      items: newItems,
    });

    setItems(newItems);
  };

  const deleteItem = (itemID: string) => {
    const matchingItem = items.filter((arrItem) => arrItem.uid === itemID);
    if (matchingItem.length === 1) {
      const otherItems = items.filter((arrItem) => arrItem.uid !== itemID);

      const newItems = [...otherItems];

      ipcRenderer.send('saveItems', {
        items: newItems,
      });

      setItems(newItems);
    }
  };

  return (
    <ItemsContainer>
      <ItemDisplay
        item={selectedItem}
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
        <ItemDisplayInput label="Search" value={search} onChange={setSearch} />
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
                  onDelete={() => deleteItem(item.uid)}
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
