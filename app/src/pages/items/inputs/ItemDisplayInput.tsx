import styled from '@emotion/styled';

const ItemDisplayInputField = styled.input`
  width: 100px;
`;

const ItemDisplayInputLabel = styled.label``;

const ItemDisplayInputContainer = styled.div``;

export interface ItemDisplayProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

export const ItemDisplayInput: React.FC<ItemDisplayProps> = ({
  value,
  onChange,
  label,
  type,
}) => {
  return (
    <ItemDisplayInputContainer>
      <ItemDisplayInputLabel htmlFor={label}>{label}</ItemDisplayInputLabel>
      <ItemDisplayInputField
        type={type ?? 'text'}
        name={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </ItemDisplayInputContainer>
  );
};
