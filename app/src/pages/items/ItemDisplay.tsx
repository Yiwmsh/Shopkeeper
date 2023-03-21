import { ButtonBank } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components';
import { Item } from '../../types';
import {
  ItemConsumableCheckbox,
  ItemDescriptionInput,
  ItemDisplayInput,
  ItemMagicCheckbox,
  ItemRaritySelect,
  ItemStockRangeInput,
  ItemValueInput,
} from './inputs';

const ItemDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemDisplay: React.FC<{
  item: Item | undefined;
  saveItem: (item: Item) => void;
  deleteItem: (itemID: string) => void;
}> = ({ item, saveItem, deleteItem }) => {
  const [source, setSource] = React.useState(item?.source ?? 'Core');
  const [name, setName] = React.useState(item?.name ?? '');
  const [value, setValue] = React.useState(item?.value ?? 0);
  const [weight, setWeight] = React.useState(item?.weight ?? 0);
  const [description, setDescription] = React.useState(item?.description ?? '');
  const [rarity, setRarity] = React.useState(item?.rarity ?? 'common');
  const [magic, setMagic] = React.useState(item?.magic ?? false);
  const [tags, setTags] = React.useState<string[]>(item?.tags ?? []);
  const [consumable, setConsumable] = React.useState(item?.consumable ?? false);
  const [stockLowEnd, setStockLowEnd] = React.useState(
    item?.stockRange.low ?? 0
  );
  const [stockHighEnd, setStockHighEnd] = React.useState(
    item?.stockRange.high ?? 10
  );

  const formatTags = (tagsIn: string): string[] => {
    return tagsIn.replaceAll(',', '').split(' ');
  };

  useEffect(() => {
    setSource(item?.source ?? 'Core');
    setName(item?.name ?? '');
    setValue(item?.value ?? 0);
    setWeight(item?.weight ?? 0);
    setDescription(item?.description ?? '');
    setRarity(item?.rarity ?? 'common');
    setMagic(item?.magic ?? false);
    setTags(item?.tags ?? []);
    setConsumable(item?.consumable ?? false);
    setStockLowEnd(item?.stockRange.low ?? 0);
    setStockHighEnd(item?.stockRange.high ?? 10);
  }, [item]);

  return (
    <ItemDisplayContainer>
      <ItemDisplayInput label="Name" value={name} onChange={setName} />
      <ItemValueInput
        value={value}
        onChange={(value: number) => {
          setValue(value);
        }}
      />

      <ItemDisplayInput
        type="number"
        label="Weight"
        value={`${weight}`}
        onChange={(num) => {
          try {
            setWeight(Number(num));
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <ItemDescriptionInput
        label="Description"
        value={description}
        onChange={setDescription}
      />
      <ItemDisplayInput label="Source" value={source} onChange={setSource} />
      <ItemRaritySelect value={rarity} onChange={setRarity} />
      <ItemMagicCheckbox value={magic} onChange={setMagic} />
      <ItemConsumableCheckbox value={consumable} onChange={setConsumable} />
      <ItemDisplayInput
        label="Tags"
        value={tags.join(', ')}
        onChange={(value: string) => setTags(formatTags(value))}
      />
      <ItemStockRangeInput
        lowValue={stockLowEnd}
        lowValueChange={setStockLowEnd}
        highValue={stockHighEnd}
        highValueChange={setStockHighEnd}
      />
      <ButtonBank>
        <Button
          onClick={() =>
            saveItem({
              uid: item?.uid ?? uuidv4(),
              name: name,
              value: value,
              source: source,
              weight: weight,
              description: description,
              rarity: rarity,
              magic: magic,
              tags: tags,
              consumable: consumable,
              stockRange: {
                low: stockLowEnd,
                high: stockHighEnd,
              },
            })
          }
          buttonType="constructive"
        >
          Save
        </Button>
        <Button
          onClick={() => {
            if (item) {
              deleteItem(item.uid);
            }
          }}
          buttonType="destructive"
        >
          Delete Item
        </Button>
      </ButtonBank>
    </ItemDisplayContainer>
  );
};
