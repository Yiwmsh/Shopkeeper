import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import React from 'react';
import { useTags } from '../../../../utils/useTags';
import { ItemDisplayInput } from '../../../items';
import { SetTagTableEntry } from './SetTagTableEntry';

const SetTagTableContainer = styled.div`
  background-color: var(${SemanticColors.altText});
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
`;

const TagsList = styled.div`
  display: flex;
  border-top: 1px solid black;
  padding: 5px;
  gap: 5px;
  width: 435px;
  flex-wrap: wrap;
`;

export interface SetTagTableProps {
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export const SetTagTable: React.FC<SetTagTableProps> = ({
  onAdd,
  onRemove,
}) => {
  const tags = useTags();
  const [search, setSearch] = React.useState('');

  return (
    <SetTagTableContainer>
      <Row>
        <ItemDisplayInput label="Search" value={search} onChange={setSearch} />
      </Row>
      <TagsList>
        {tags.map((tag) => {
          if (tag.includes(search)) {
            return (
              <SetTagTableEntry tag={tag} onAdd={onAdd} onRemove={onRemove} />
            );
          }
        })}
      </TagsList>
    </SetTagTableContainer>
  );
};
