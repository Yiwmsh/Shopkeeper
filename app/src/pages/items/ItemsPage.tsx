import styled from '@emotion/styled';
import { ItemDisplay } from './ItemDisplay';
import { ListItem } from './ListItem';
import { item, makeRandomItem } from './item';
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ItemsList = styled.div``;

const items: item[] = [];
for (let i = 0; i < 10; i++) {
  items.push(makeRandomItem());
}

export const ItemsPage: React.FC = () => {
  return (
    <ItemsContainer>
      <ItemDisplay />
      <ItemsList>
        {items.map((item) => (
          <ListItem item={item} />
        ))}
      </ItemsList>
    </ItemsContainer>
  );
};
