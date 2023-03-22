import styled from '@emotion/styled';
import { InputProps } from './Input';

const TextAreaRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextAreaLabel = styled.label``;

const TextAreaInput = styled.textarea`
  resize: both;
  width: 440px;
  height: 100px;
`;

export const TextArea: React.FC<InputProps> = ({ label, onChange, value }) => {
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
