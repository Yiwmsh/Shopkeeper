import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { ItemDisplay } from './ItemDisplay';
import { ListItem } from './ListItem';
import { item, makeRandomItem } from './item';
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ItemsList = styled.div``;

export const ItemsPage: React.FC = () => {
  const [items, setItems] = React.useState<item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<item | undefined>();

  useEffect(() => {
    const templateItems: item[] = [];
    for (let i = 0; i < 10; i++) {
      templateItems.push(makeRandomItem());
    }
    setItems(templateItems);
  }, []);

  const saveItem = (item: item) => {
    const matchingItem = items.filter((arrItem) => arrItem.uid === item.uid);
    if (matchingItem.length < 1) {
      setItems([item, ...items]);
    } else {
      const otherItems = items.filter((arrItem) => arrItem.uid !== item.uid);
      setItems([item, ...otherItems]);
    }
    console.log(items);
  };

  return (
    <ItemsContainer>
      <ItemDisplay item={selectedItem} saveItem={saveItem} />
      <ItemsList>
        {items.map((item) => (
          <ListItem
            key={item.uid}
            item={item}
            onClick={(item: item) => setSelectedItem(item)}
          />
        ))}
      </ItemsList>
    </ItemsContainer>
  );
};
