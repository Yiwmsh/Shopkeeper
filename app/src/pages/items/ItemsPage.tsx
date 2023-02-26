import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { ItemDisplay } from './ItemDisplay';
import { ListItem } from './ListItem';
import { Item, makeRandomItem } from './item';

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ItemsList = styled.div``;

export const ItemsPage: React.FC = () => {
  const ipcRenderer = (window as any).ipcRenderer;
  const [items, setItems] = React.useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Item | undefined>();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  useEffect(() => {
    const templateItems: Item[] = [];
    for (let i = 0; i < 10; i++) {
      templateItems.push(makeRandomItem());
    }
    setItems(templateItems);
  }, []);

  const saveItem = (item: Item) => {
    const matchingItem = items.filter((arrItem) => arrItem.uid === item.uid);
    if (matchingItem.length < 1) {
      setItems([item, ...items]);
    } else {
      const otherItems = items.filter((arrItem) => arrItem.uid !== item.uid);
      setItems([item, ...otherItems]);
    }
    setIsSaving(true);
    ipcRenderer.send('saveItems', {
      items: items,
    });
  };

  return (
    <ItemsContainer>
      <ItemDisplay item={selectedItem} saveItem={saveItem} />
      <ItemsList>
        {items.map((item) => (
          <ListItem
            key={item.uid}
            item={item}
            onClick={(item: Item) => setSelectedItem(item)}
          />
        ))}
      </ItemsList>
    </ItemsContainer>
  );
};
