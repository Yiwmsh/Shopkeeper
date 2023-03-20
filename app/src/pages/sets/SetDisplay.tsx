import { ButtonBank } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/inputs/Button';
import { ItemDescriptionInput } from '../items/inputs/ItemDescriptionInput';
import { ItemDisplayInput } from '../items/inputs/ItemDisplayInput';
import { ItemSet } from './itemSet';

const SetDisplayContainer = styled.div``;

export const SetDisplay: React.FC<{
  set: ItemSet | undefined;
  saveSet: (set: ItemSet) => void;
  deleteSet: (setID: string) => void;
}> = ({ set, saveSet, deleteSet }) => {
  const [name, setName] = React.useState(set?.name ?? '');
  const [description, setDescription] = React.useState(set?.description ?? '');
  const [itemIDs, setItemIDs] = React.useState<string[]>(set?.itemIDs ?? []);
  const [uid, setUid] = React.useState(set?.uid ?? uuidv4());

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
