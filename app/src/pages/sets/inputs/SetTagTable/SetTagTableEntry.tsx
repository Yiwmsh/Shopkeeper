import styled from '@emotion/styled';
import { Button } from '../../../../components';

const SetTagTableEntryContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 3px;
  border: 1px solid black;
`;

export interface SetTagTableEntryProps {
  tag: string;
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}

export const SetTagTableEntry: React.FC<SetTagTableEntryProps> = ({
  tag,
  onAdd,
  onRemove,
}) => {
  return (
    <SetTagTableEntryContainer>
      <Button buttonType="constructive" onClick={() => onAdd(tag)}>
        +
      </Button>
      {tag}
      <Button buttonType="destructive" onClick={() => onRemove(tag)}>
        -
      </Button>
    </SetTagTableEntryContainer>
  );
};
