import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { ItemDisplayInput } from '../../../pages/items';
import { GroupAddRemoveEntry } from './GroupAddRemoveEntry';

const GroupAddRemoveContainer = styled.div`
  background-color: var(${SemanticColors.altText});
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const GroupList = styled.div`
  display: flex;
  border-top: 1px solid black;
  padding: 5px;
  gap: 5px;
  width: 435px;
  flex-wrap: wrap;
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
        <ItemDisplayInput label="Search" value={search} onChange={setSearch} />
      </Row>
      <GroupList>
        {groups.map((tag) => {
          if (tag.includes(search)) {
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
