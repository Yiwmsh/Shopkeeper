import { ButtonBank, SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemConsumableCheckbox } from './inputs/ItemConsumableCheckbox';
import { ItemDescriptionInput } from './inputs/ItemDescriptionInput';
import { ItemDisplayInput } from './inputs/ItemDisplayInput';
import { ItemMagicCheckbox } from './inputs/ItemMagicCheckbox';
import { ItemRaritySelect } from './inputs/ItemRaritySelect';
import { ItemStockRangeInput } from './inputs/ItemStockRangeInput';
import { ItemValueInput } from './inputs/ItemValueInput';
import { Item } from './item';

const ItemDisplayContainer = styled.div``;

const SaveButton = styled(motion.button)`
  background-color: var(${SemanticColors.secondary});
  color: var(${SemanticColors.altText});
  border: none;
  padding: 5px 10px;
`;
const DeleteButton = styled(motion.button)`
  background-color: var(${SemanticColors.error});
  color: var(${SemanticColors.altText});
  border: none;
  padding: 5px 10px;
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
        <SaveButton
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
          whileHover={{
            backgroundColor: `var(${SemanticColors.secondaryActive})`,
          }}
          whileTap={{
            backgroundColor: `var(${SemanticColors.secondaryDisabled})`,
          }}
        >
          Save
        </SaveButton>
        <DeleteButton
          onClick={() => {
            if (item) {
              deleteItem(item.uid);
            }
          }}
          whileHover={{
            filter: `contrast(2)`,
          }}
        >
          Delete Item
        </DeleteButton>
      </ButtonBank>
    </ItemDisplayContainer>
  );
};
