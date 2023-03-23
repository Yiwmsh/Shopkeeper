import styled from '@emotion/styled';
import { Button } from '../../../components';
import { Shop } from '../../../types/shop';

const ShopsListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: horizontal;
  flex-wrap: wrap;
`;

export const ShopsList: React.FC<{
  shops: Shop[];
  setSelectedShop: (selectedShop: Shop) => void;
}> = ({ shops, setSelectedShop }) => {
  return (
    <ShopsListContainer>
      {shops.map((shop) => (
        <Button onClick={() => setSelectedShop(shop)}>{shop.name}</Button>
      ))}
    </ShopsListContainer>
  );
};
