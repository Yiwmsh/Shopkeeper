import styled from '@emotion/styled';
import { Button } from '../..';

const GroupAddRemoveEntryContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
  border: 1px solid black;
`;

export interface GroupAddRemoveEntryProps {
  tag: string;
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export const GroupAddRemoveEntry: React.FC<GroupAddRemoveEntryProps> = ({
  tag,
  onAdd,
  onRemove,
}) => {
  return (
    <GroupAddRemoveEntryContainer>
      <Button buttonType="constructive" onClick={() => onAdd(tag)}>
        +
      </Button>
      {tag}
      <Button buttonType="destructive" onClick={() => onRemove(tag)}>
        -
      </Button>
    </GroupAddRemoveEntryContainer>
  );
};
