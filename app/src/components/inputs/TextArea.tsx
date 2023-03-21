import styled from '@emotion/styled';
import { ItemDisplayProps } from '../../pages/items/inputs/ItemDisplayInput';

const TextAreaRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextAreaLabel = styled.label``;

const TextAreaInput = styled.textarea`
  resize: both;
  width: 440px;
  height: 50px;
`;

export const TextArea: React.FC<ItemDisplayProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <TextAreaRow>
      <TextAreaLabel>{label}</TextAreaLabel>
      <TextAreaInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </TextAreaRow>
  );
};
