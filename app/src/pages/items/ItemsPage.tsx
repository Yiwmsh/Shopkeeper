import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
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

const NewItemButton = styled(motion.button)`
  margin: 10px auto;
  padding: 5px 10px;
  color: white;
  font-size: 20px;
  background-color: var(${SemanticColors.secondary});
  border: none;
`;

export const ItemsPage: React.FC = () => {
  const ipcRenderer = (window as any).ipcRenderer;
  const [itemsLoaded, setItemsLoaded] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  useEffect(() => {
    const loadItems = async () => {
      console.log('Loading.');
      ipcRenderer.invoke('loadItems', {}).then((result: any) => {
        try {
          console.log(`result: ${result}`);
          const loadedItems = result as Item[];
          setItems(loadedItems);
        } catch (e) {
          console.log(e);
        }
      });
    };

    if (!itemsLoaded) {
      loadItems();
      setItemsLoaded(true);
    }
  }, []);

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
    console.log(matchingItem.length);
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
        <NewItemButton
          onClick={() => {
            setSelectedItem(undefined);
          }}
          whileHover={{
            backgroundColor: `var(${SemanticColors.secondaryActive})`,
          }}
          whileTap={{
            backgroundColor: `var(${SemanticColors.secondaryDisabled})`,
          }}
        >
          +{' '}
        </NewItemButton>
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
