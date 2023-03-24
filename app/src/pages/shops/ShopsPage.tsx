import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Button } from '../../components';
import { DEFAULT_SHOP } from '../../consts/defaultShop';
import { Shop } from '../../types/shop';
import { useDeleteShop, useSaveShop } from '../../utils';
import { ShopView } from './ShopView/ShopView';
import { ShopsList } from './ShopsList/ShopsList';

const ShopPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const ShopsPage: React.FC<{ loadedShops: Shop[] }> = ({
  loadedShops,
}) => {
  const ipcRenderer = (window as any).ipcRenderer;

  const [shops, setShops] = React.useState<Shop[]>(loadedShops);
  const [selectedShop, setSelectedShop] = React.useState<Shop | undefined>(
    undefined
  );
  const saveShop = useSaveShop();
  const deleteShop = useDeleteShop();

  return selectedShop === undefined ? (
    <ShopPageContainer>
      <Button
        onClick={() => {
          setSelectedShop(DEFAULT_SHOP);
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
      <ShopsList shops={loadedShops} setSelectedShop={setSelectedShop} />
    </ShopPageContainer>
  ) : (
    <ShopView
      savedShop={selectedShop}
      onBack={() => setSelectedShop(undefined)}
      onSave={saveShop}
      onDelete={deleteShop}
    />
  );
};
