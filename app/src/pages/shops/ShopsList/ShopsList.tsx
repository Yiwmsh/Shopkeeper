import styled from '@emotion/styled';
import React from 'react';
import { Button } from '../../../components';
import { Shop } from '../../../types/shop';
import { Input } from '../../items';

const ShopsListContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 5px;
  flex-direction: horizontal;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 65vh;
`;

export const ShopsList: React.FC<{
  shops: Shop[];
  setSelectedShop: (selectedShop: Shop) => void;
}> = ({ shops, setSelectedShop }) => {
  const [filter, setFilter] = React.useState('');
  const [filteredShops, setFilteredShops] = React.useState<Shop[]>(shops);
  return (
    <>
      <Input
        value={filter}
        label="Search"
        onChange={(value) => {
          setFilter(value);
          if (value === '') {
            setFilteredShops(shops);
          } else {
            setFilteredShops(
              filteredShops.filter((shop) =>
                shop.name.toLowerCase().includes(value.toLowerCase())
              )
            );
          }
        }}
      />
      <ShopsListContainer>
        {filteredShops.map((shop) => (
          <Button onClick={() => setSelectedShop(shop)}>{shop.name}</Button>
        ))}
      </ShopsListContainer>
    </>
  );
};
