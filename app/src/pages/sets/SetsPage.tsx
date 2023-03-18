import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { ListSet } from './ListSet';
import { SetDisplay } from './SetDisplay';
import { ItemSet } from './itemSet';

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

const NewSetButton = styled(motion.button)`
  margin: 10px auto;
  padding: 5px 10px;
  color: white;
  font-size: 20px;
  background-color: var(${SemanticColors.secondary});
  border: none;
`;

export const SetsPage: React.FC = () => {
  const [itemKeys, setItemKeys] = React.useState<
    { name: string; uid: string }[]
  >([]);
  const ipcRenderer = (window as any).ipcRenderer;
  const [sets, setSets] = React.useState<ItemSet[]>([]);
  const [setsLoaded, setSetsLoaded] = React.useState(false);
  const [selectedSet, setSelectedSet] = React.useState<ItemSet | undefined>();
  const [isSaving, setIsSaving] = React.useState(false);

  const loadSets = async () => {
    ipcRenderer.invoke('loadSets', {}).then((result: any) => {
      try {
        const loadedSets = result as ItemSet[];
        if (typeof loadedSets !== 'undefined') {
          setSets(loadedSets);
          setSetsLoaded(true);
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  if (!setsLoaded) {
    loadSets();
  }

  const saveSet = (set: ItemSet) => {
    let newSets = [];
    const matchingSets = sets.filter((arrSet) => arrSet.uid === set.uid);
    if (matchingSets.length < 1) {
      newSets = [set, ...sets];
    } else {
      const otherSets = sets.filter((arrSet) => arrSet.uid !== set.uid);
      newSets = [set, ...otherSets];
    }

    ipcRenderer.send('saveSets', {
      sets: newSets,
    });

    setSets(newSets);
  };

  const deleteSet = (setID: string) => {
    const matchingSet = sets.filter((arrSet) => arrSet.uid === setID);
    if (matchingSet.length === 1) {
      const otherSets = sets.filter((arrSet) => arrSet.uid !== setID);

      const newSets = [...otherSets];

      ipcRenderer.send('saveSets', {
        sets: newSets,
      });

      setSets(newSets);
    }
  };

  return (
    <SetsPageContainer>
      <SetDisplay set={selectedSet} saveSet={saveSet} deleteSet={deleteSet} />
      <SetListCol>
        <NewSetButton
          onClick={() => {
            setSelectedSet(undefined);
          }}
          whileHover={{
            backgroundColor: `var(${SemanticColors.secondaryActive})`,
          }}
          whileTap={{
            backgroundColor: `var(${SemanticColors.secondaryDisabled})`,
          }}
        >
          +{' '}
        </NewSetButton>
        <SetList>
          {setsLoaded ? sets.map((set) => <ListSet set={set} />) : ''}
        </SetList>
      </SetListCol>
    </SetsPageContainer>
  );
};
