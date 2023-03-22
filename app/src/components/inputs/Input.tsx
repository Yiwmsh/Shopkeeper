import styled from '@emotion/styled';

const InputField = styled.input`
  width: 100px;
`;

const InputLabel = styled.label``;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  type,
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputField
        type={type ?? 'text'}
        name={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputContainer>
  );
};
