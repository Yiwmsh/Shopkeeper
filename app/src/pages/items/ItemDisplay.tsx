import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemDescriptionInput } from './inputs/ItemDescriptionInput';
import { ItemDisplayInput } from './inputs/ItemDisplayInput';
import { ItemMagicCheckbox } from './inputs/ItemMagicCheckbox';
import { ItemRaritySelect } from './inputs/ItemRaritySelect';
import { ItemStockRangeInput } from './inputs/ItemStockRangeInput';
import { ItemValueInput } from './inputs/ItemValueInput';
import { item } from './item';

const ItemDisplayContainer = styled.div``;

const ItemSaveButton = styled.button``;

export const ItemDisplay: React.FC<{
  item: item | undefined;
  saveItem: (item: item) => void;
}> = ({ item, saveItem }) => {
  const [name, setName] = React.useState(item?.name ?? '');
  const [value, setValue] = React.useState(item?.value ?? 0);
  const [weight, setWeight] = React.useState(item?.weight ?? 0);
  const [description, setDescription] = React.useState(item?.description ?? '');
  const [rarity, setRarity] = React.useState(item?.rarity ?? 'common');
  const [magic, setMagic] = React.useState(item?.magic ?? false);
  const [tags, setTags] = React.useState<string[]>(item?.tags ?? []);
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
    setName(item?.name ?? '');
    setValue(item?.value ?? 0);
    setWeight(item?.weight ?? 0);
    setDescription(item?.description ?? '');
    setRarity(item?.rarity ?? 'common');
    setMagic(item?.magic ?? false);
    setTags(item?.tags ?? []);
    setStockLowEnd(item?.stockRange.low ?? 0);
    setStockHighEnd(item?.stockRange.high ?? 10);
  }, [item]);

  return (
    <ItemDisplayContainer>
      <ItemDisplayInput label="Name" value={name} onChange={setName} />
      <ItemValueInput
        value={value}
        onChange={(value: number) => {
          console.log(value);
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
      <ItemRaritySelect value={rarity} onChange={setRarity} />
      <ItemMagicCheckbox value={magic} onChange={setMagic} />
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
      <ItemSaveButton
        onClick={() =>
          saveItem({
            uid: item?.uid ?? uuidv4(),
            name: name,
            value: value,
            weight: weight,
            description: description,
            rarity: rarity,
            magic: magic,
            tags: tags,
            stockRange: {
              low: stockLowEnd,
              high: stockHighEnd,
            },
          })
        }
      >
        Save
      </ItemSaveButton>
    </ItemDisplayContainer>
  );
};
