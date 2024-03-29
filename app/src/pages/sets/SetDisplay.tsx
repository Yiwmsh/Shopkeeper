import { ButtonBank } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, MultiSelectList } from '../../components';
import { ItemSet } from '../../types';
import { useItems, useTags } from '../../utils';
import { Input, TextArea } from '../items';

const SetDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SetDisplay: React.FC<{
  set: ItemSet | undefined;
  saveSet: (set: ItemSet) => void;
  deleteSet: (set: ItemSet) => void;
}> = ({ set, saveSet, deleteSet }) => {
  const [name, setName] = React.useState(set?.name ?? '');
  const [description, setDescription] = React.useState(set?.description ?? '');
  const [itemIDs, setItemIDs] = React.useState<string[]>(set?.itemIDs ?? []);
  const tags = useTags();

  const { data: items, isLoading } = useItems();

  const onSelectionChanged = (
    selectedEntries: string[],
    selectionState: 'select' | 'unselect'
  ) => {
    if (selectionState === 'select') {
      setItemIDs([...itemIDs, ...selectedEntries]);
    } else if (selectionState === 'unselect') {
      setItemIDs([
        ...itemIDs.filter(
          (itemID) =>
            !selectedEntries.some((selectedEntry) => itemID === selectedEntry)
        ),
      ]);
    }
    // if (itemIDs.some((id) => id === selectedEntry)) {
    //   if (selectionState === 'unselect') {
    //     setItemIDs(itemIDs.filter((item) => item !== selectedEntry));
    //   }
    // } else {
    //   if (selectionState === 'select') {
    //     setItemIDs([...itemIDs, selectedEntry]);
    //   }
    // }
  };

  const addTagItems = (tag: string) => {
    const tagItems = items
      ?.filter((item) => item.tags?.some((itemTag) => itemTag === tag))
      .map((tagItem) => tagItem.uid);
    if (tagItems) {
      setItemIDs([...itemIDs, ...tagItems]);
    }
  };

  const removeTagItems = (tag: string) => {
    const tagItems = items
      ?.filter((item) => item.tags?.some((itemTag) => itemTag === tag))
      .map((tagItem) => tagItem.uid);
    if (tagItems) {
      setItemIDs([
        ...itemIDs.filter(
          (itemID) => !tagItems.some((tagItem) => tagItem === itemID)
        ),
      ]);
    }
  };

  React.useEffect(() => {
    setName(set?.name ?? '');
    setDescription(set?.description ?? '');
    setItemIDs(set?.itemIDs ?? []);
  }, [set]);

  return (
    <SetDisplayContainer>
      <Input label="Name" value={name} onChange={setName} />
      <TextArea
        label="Description"
        value={description}
        onChange={setDescription}
      />
      <MultiSelectList
        maxHeight="300px"
        entries={items ?? []}
        selectedEntries={itemIDs}
        onSelectionChange={onSelectionChanged}
      />
      <ButtonBank>
        <Button
          onClick={() =>
            saveSet({
              uid: set?.uid ?? uuidv4(),
              name: name,
              description: description,
              itemIDs: itemIDs,
            })
          }
          buttonType="constructive"
        >
          Save
        </Button>
        <Button
          onClick={() => {
            if (set) {
              deleteSet(set);
            }
          }}
          buttonType="destructive"
        >
          Delete Set
        </Button>
      </ButtonBank>
    </SetDisplayContainer>
  );
};
