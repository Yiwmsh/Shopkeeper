import styled from '@emotion/styled';
import React from 'react';
import { ItemDisplayInput } from './inputs/ItemDisplayInput';
import { ItemMagicCheckbox } from './inputs/ItemMagicCheckbox';
import { ItemRaritySelect } from './inputs/ItemRaritySelect';
import { ItemStockRangeInput } from './inputs/ItemStockRangeInput';
import { item } from './item';

const ItemDisplayContainer = styled.div``;

export const ItemDisplay: React.FC<{ item?: item }> = ({ item }) => {
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

  return (
    <ItemDisplayContainer>
      <ItemDisplayInput label="Name" value={name} onChange={setName} />
      <ItemDisplayInput
        type="number"
        label="Value"
        value={`${value}`}
        onChange={(num) => {
          try {
            setValue(Number(num));
          } catch (e) {
            console.log(e);
          }
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
      <ItemDisplayInput
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
    </ItemDisplayContainer>
  );
};
