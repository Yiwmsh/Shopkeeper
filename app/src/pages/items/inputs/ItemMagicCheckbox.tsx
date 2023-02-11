import styled from '@emotion/styled';

const ItemMagicCheckboxInput = styled.input``;

const ItemMagicCheckboxLabel = styled.label``;

const ItemMagicCheckboxContainer = styled.div``;

export const ItemMagicCheckbox: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <ItemMagicCheckboxContainer>
      <ItemMagicCheckboxLabel>Magic?</ItemMagicCheckboxLabel>
      <ItemMagicCheckboxInput
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
      />
    </ItemMagicCheckboxContainer>
  );
};
