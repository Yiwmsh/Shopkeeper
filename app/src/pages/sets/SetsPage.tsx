import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Button, SelectableListEntry } from '../../components';
import { ItemSet } from '../../types';
import { useDeleteSet, useSaveSet } from '../../utils';
import { SetDisplay } from './SetDisplay';

const SetsPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const SetListCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const SetList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 70vh;
`;

export const SetsPage: React.FC<{ loadedSets: ItemSet[] }> = ({
  loadedSets,
}) => {
  const [itemKeys, setItemKeys] = React.useState<
    { name: string; uid: string }[]
  >([]);
  const ipcRenderer = (window as any).ipcRenderer;
  const [sets, setSets] = React.useState<ItemSet[]>(loadedSets);
  const [selectedSet, setSelectedSet] = React.useState<ItemSet | undefined>();
  const [isSaving, setIsSaving] = React.useState(false);
  const saveSet = useSaveSet();
  const deleteSet = useDeleteSet();

  return (
    <SetsPageContainer>
      <SetDisplay set={selectedSet} saveSet={saveSet} deleteSet={deleteSet} />
      <SetListCol>
        <Button
          onClick={() => {
            setSelectedSet(undefined);
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
        <SetList>
          {sets.map((set) => (
            <SelectableListEntry
              onSelect={() => setSelectedSet(set)}
              onDelete={() => deleteSet(set)}
            >
              <div>{set.name}</div>
            </SelectableListEntry>
          ))}
        </SetList>
      </SetListCol>
    </SetsPageContainer>
  );
};
