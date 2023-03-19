import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Button } from '../../consts/inputs/Button';
import { ItemDisplay } from './ItemDisplay';
import { ListItem } from './ListItem';
import { Item } from './item';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ItemsListCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70vh;
`;

export const ItemsPage: React.FC = () => {
  const ipcRenderer = (window as any).ipcRenderer;
  const [itemsLoaded, setItemsLoaded] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const loadItems = async () => {
    console.log('Loading.');
    ipcRenderer.invoke('loadItems', {}).then((result: any) => {
      try {
        const loadedItems = result as Item[];
        if (typeof loadedItems !== 'undefined') {
          setItems(loadedItems);
          setItemsLoaded(true);
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  if (!itemsLoaded) {
    loadItems();
  }

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
        <ItemsList>
          {items.map((item) => (
            <ListItem
              key={item.uid}
              isSelected={selectedItem?.uid === item.uid}
              item={item}
              onSelect={(item: Item) => setSelectedItem(item)}
              onDelete={deleteItem}
            />
          ))}
        </ItemsList>
      </ItemsListCol>
    </ItemsContainer>
  );
};
