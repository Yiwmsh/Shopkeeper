import { ButtonBank } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/inputs/Button';
import { MultiSelectList } from '../../components/inputs/MultiSelectList';
import { ItemSet } from '../../types/itemSet';
import { useItems } from '../../utils/useItems';
import { ItemDescriptionInput } from '../items/inputs/ItemDescriptionInput';
import { ItemDisplayInput } from '../items/inputs/ItemDisplayInput';

const SetDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SetDisplay: React.FC<{
  set: ItemSet | undefined;
  saveSet: (set: ItemSet) => void;
  deleteSet: (setID: string) => void;
}> = ({ set, saveSet, deleteSet }) => {
  const [name, setName] = React.useState(set?.name ?? '');
  const [description, setDescription] = React.useState(set?.description ?? '');
  const [itemIDs, setItemIDs] = React.useState<string[]>(set?.itemIDs ?? []);

  const { data: items, isLoading } = useItems();

  const onSelectionChanged = (
    selectedEntry: string,
    selectionState: 'select' | 'unselect'
  ) => {
    if (itemIDs.some((id) => id === selectedEntry)) {
      if (selectionState === 'unselect') {
        setItemIDs(itemIDs.filter((item) => item !== selectedEntry));
      }
    } else {
      if (selectionState === 'select') {
        setItemIDs([...itemIDs, selectedEntry]);
      }
    }
  };

  React.useEffect(() => {
    setName(set?.name ?? '');
    setDescription(set?.description ?? '');
    setItemIDs(set?.itemIDs ?? []);
  }, [set]);

  return (
    <SetDisplayContainer>
      <ItemDisplayInput label="Name" value={name} onChange={setName} />
      <ItemDescriptionInput
        label="Description"
        value={description}
        onChange={setDescription}
      />
      <MultiSelectList
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
              deleteSet(set.uid);
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
