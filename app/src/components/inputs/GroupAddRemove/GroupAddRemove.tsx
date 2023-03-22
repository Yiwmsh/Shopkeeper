import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { Input } from '../../../pages/items';
import { GroupAddRemoveEntry } from './GroupAddRemoveEntry';

const GroupAddRemoveContainer = styled.div`
  background-color: var(${SemanticColors.altText});
  border: 1px solid black;
  width: 445px;
  max-height: 145px;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const GroupList = styled.div`
  display: flex;
  border-top: 1px solid black;
  max-height: 100%;
  padding: 5px;
  gap: 5px;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

export interface GroupAddRemoveProps {
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  groups: string[];
}

export const GroupAddRemove: React.FC<GroupAddRemoveProps> = ({
  onAdd,
  onRemove,
  groups,
}) => {
  const [search, setSearch] = React.useState('');

  return (
    <GroupAddRemoveContainer>
      <Row>
        <Input label="Search" value={search} onChange={setSearch} />
      </Row>
      <GroupList>
        {groups.map((tag) => {
          if (tag.toLowerCase().includes(search.toLowerCase())) {
            return (
              <GroupAddRemoveEntry
                tag={tag}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            );
          }
        })}
      </GroupList>
    </GroupAddRemoveContainer>
  );
};
