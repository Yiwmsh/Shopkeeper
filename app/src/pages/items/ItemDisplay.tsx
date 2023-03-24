import { ButtonBank } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components';
import { DEFAULT_ITEM } from '../../consts';
import { Item } from '../../types';
import {
  Input,
  ItemConsumableCheckbox,
  ItemMagicCheckbox,
  ItemRaritySelect,
  ItemStockRangeInput,
  ItemValueInput,
  TextArea,
} from './inputs';

const ItemDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const PinButton = styled(motion.button)`
  border: none;
  background-color: rgba(255, 0, 0, 0);
  cursor: pointer;
`;

const UpdateDefaultButton: React.FC<{
  onLock: () => void;
  onUnlock: () => void;
  isLocked: boolean;
}> = ({ onLock, onUnlock, isLocked }) => {
  return (
    <PinButton
      animate={{
        filter: isLocked ? '' : 'grayscale(100%)',
      }}
      whileHover={{
        filter: isLocked ? 'grayscale(100%)' : '',
      }}
      onClick={() => (isLocked ? onUnlock() : onLock())}
    >
      📌
    </PinButton>
  );
};

export const ItemDisplay: React.FC<{
  item: Item | undefined;
  saveItem: (item: Item) => void;
  deleteItem: (item: Item) => void;
  onDefaultChanged: (newDefault: Item) => void;
  defaultItem: Item;
}> = ({ item, saveItem, deleteItem, onDefaultChanged, defaultItem }) => {
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
    return tagsIn.replaceAll(',', '').toLowerCase().split(' ');
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
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.name !== DEFAULT_ITEM.name}
          onLock={() => onDefaultChanged({ ...defaultItem, name: name })}
          onUnlock={() =>
            onDefaultChanged({ ...defaultItem, name: DEFAULT_ITEM.name })
          }
        />
        <Input label="Name" value={name} onChange={setName} />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.value !== DEFAULT_ITEM.value}
          onLock={() => onDefaultChanged({ ...defaultItem, value: value })}
          onUnlock={() =>
            onDefaultChanged({ ...defaultItem, value: DEFAULT_ITEM.value })
          }
        />
        <ItemValueInput
          value={value}
          onChange={(value: number) => {
            setValue(value);
          }}
        />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.weight !== DEFAULT_ITEM.weight}
          onLock={() => onDefaultChanged({ ...defaultItem, weight: weight })}
          onUnlock={() =>
            onDefaultChanged({ ...defaultItem, weight: DEFAULT_ITEM.weight })
          }
        />
        <Input
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
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.description !== DEFAULT_ITEM.description}
          onLock={() =>
            onDefaultChanged({ ...defaultItem, description: description })
          }
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              description: DEFAULT_ITEM.description,
            })
          }
        />
        <label htmlFor="description">Description</label>
      </Row>
      <TextArea label="" value={description} onChange={setDescription} />
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.source !== DEFAULT_ITEM.source}
          onLock={() => onDefaultChanged({ ...defaultItem, source: source })}
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              source: DEFAULT_ITEM.source,
            })
          }
        />
        <Input label="Source" value={source} onChange={setSource} />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.rarity !== DEFAULT_ITEM.rarity}
          onLock={() => onDefaultChanged({ ...defaultItem, rarity: rarity })}
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              rarity: DEFAULT_ITEM.rarity,
            })
          }
        />
        <ItemRaritySelect value={rarity} onChange={setRarity} />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.magic !== DEFAULT_ITEM.magic}
          onLock={() => onDefaultChanged({ ...defaultItem, magic: magic })}
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              magic: DEFAULT_ITEM.magic,
            })
          }
        />
        <ItemMagicCheckbox value={magic} onChange={setMagic} />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.consumable !== DEFAULT_ITEM.consumable}
          onLock={() =>
            onDefaultChanged({ ...defaultItem, consumable: consumable })
          }
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              consumable: DEFAULT_ITEM.consumable,
            })
          }
        />
        <ItemConsumableCheckbox value={consumable} onChange={setConsumable} />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.tags !== DEFAULT_ITEM.tags}
          onLock={() => onDefaultChanged({ ...defaultItem, tags: tags })}
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              tags: DEFAULT_ITEM.tags,
            })
          }
        />
        <Input
          label="Tags"
          value={tags.join(', ')}
          onChange={(value: string) => setTags(formatTags(value))}
        />
      </Row>
      <Row>
        <UpdateDefaultButton
          isLocked={defaultItem.stockRange !== DEFAULT_ITEM.stockRange}
          onLock={() =>
            onDefaultChanged({
              ...defaultItem,
              stockRange: { high: stockHighEnd, low: stockLowEnd },
            })
          }
          onUnlock={() =>
            onDefaultChanged({
              ...defaultItem,
              stockRange: DEFAULT_ITEM.stockRange,
            })
          }
        />
        <ItemStockRangeInput
          lowValue={stockLowEnd}
          lowValueChange={setStockLowEnd}
          highValue={stockHighEnd}
          highValueChange={setStockHighEnd}
        />
      </Row>
      <ButtonBank>
        <Button
          onClick={() => {
            if (item?.uid && source !== item?.source) {
              console.log('deleting original object');
              deleteItem(item);
            }

            saveItem({
              uid: item?.uid ? item.uid : uuidv4(),
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
            });
          }}
          buttonType="constructive"
        >
          Save
        </Button>
        <Button
          onClick={() => {
            if (item) {
              deleteItem(item);
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
