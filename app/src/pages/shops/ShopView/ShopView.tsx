import { ButtonBank, SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, MultiSelectList } from '../../../components';
import { displayValue } from '../../../functions';
import { Item } from '../../../types';
import { Shop } from '../../../types/shop';
import { useItems } from '../../../utils';
import { Input, TextArea } from '../../items';

const ShopViewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditShopPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 30px;
`;

const ShopInventory = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 3px; */
  max-height: 80vh;
  width: 45vw;
  overflow-y: auto;
`;

const ShopInventoryEntry = styled.div<{ index: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid black; */
  background-color: var(
    ${({ index }) =>
      index % 2 === 0 ? SemanticColors.altText : SemanticColors.primary}
  );
  padding: 3px;
  color: var(
    ${({ index }) =>
      index % 2 === 0 ? SemanticColors.text : SemanticColors.altText}
  );
`;

export interface ShopViewProps {
  savedShop: Shop;
  onBack: () => void;
  onSave: (shop: Shop) => void;
  onDelete: (shop: Shop) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  savedShop,
  onBack,
  onSave,
  onDelete,
}) => {
  const [shop, setShop] = React.useState<Shop>(savedShop);

  const { data: items, isLoading, isError, error } = useItems();

  if (!shop.uid) {
    setShop({ ...shop, uid: uuidv4() });
  }

  const onSelectedItemsChange = (
    selectedEntries: string[],
    selectionState: 'select' | 'unselect'
  ) => {
    if (selectionState === 'select') {
      setShop({ ...shop, itemIds: [...shop.itemIds, ...selectedEntries] });
    }

    if (selectionState === 'unselect') {
      setShop({
        ...shop,
        itemIds: [
          ...shop.itemIds.filter((itemID) =>
            selectedEntries.every((selectedEntry) => selectedEntry !== itemID)
          ),
        ],
      });
    }
  };

  const generateShop = () => {
    const inventory: Item[] = [];
    for (const itemID of shop.itemIds) {
      const matchingItem = items?.find((item) => item.uid === itemID);
      if (matchingItem) {
        const inventoryItem: Item = {
          ...matchingItem,
          value: matchingItem?.value * (1 + shop.priceModifier),
        };
        inventory.push(inventoryItem);
      }
    }
    setShop({ ...shop, inventory: inventory });
  };

  return (
    <>
      <Button onClick={onBack}>Back</Button>
      <ShopViewContainer>
        <EditShopPanel>
          <Input
            value={shop.name}
            onChange={(value) => setShop({ ...shop, name: value })}
            label="Name"
          />
          <TextArea
            label="Description"
            value={shop.description}
            onChange={(value) => setShop({ ...shop, description: value })}
          />
          <Input
            label="Markup / Discount"
            type="number"
            value={`${shop.priceModifier}`}
            onChange={(value) =>
              setShop({ ...shop, priceModifier: Number(value) })
            }
          />
          {isLoading || isError ? null : (
            <MultiSelectList
              entries={items}
              selectedEntries={shop.itemIds}
              onSelectionChange={onSelectedItemsChange}
              maxHeight="250px"
            />
          )}
          <ButtonBank>
            <Button onClick={() => generateShop()}>Generate Shop</Button>
            <Button onClick={() => onSave(shop)} buttonType="constructive">
              Save
            </Button>
            <Button onClick={() => onDelete(shop)} buttonType="destructive">
              Delete
            </Button>
          </ButtonBank>
        </EditShopPanel>
        <ShopInventory>
          {shop.inventory && shop.inventory.length > 0
            ? shop.inventory.map((item, index) => (
                <ShopInventoryEntry index={index}>
                  <div>{item.name}</div> <div>{displayValue(item.value)}</div>
                </ShopInventoryEntry>
              ))
            : ''}
        </ShopInventory>
      </ShopViewContainer>
    </>
  );
};
