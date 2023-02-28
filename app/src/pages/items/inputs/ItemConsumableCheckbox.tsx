import styled from '@emotion/styled';

const ItemConsumableCheckboxInput = styled.input``;

const ItemConsumableCheckboxLabel = styled.label``;

const ItemConsumableCheckboxContainer = styled.div``;

export const ItemConsumableCheckbox: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <ItemConsumableCheckboxContainer>
      <ItemConsumableCheckboxLabel>Consumable?</ItemConsumableCheckboxLabel>
      <ItemConsumableCheckboxInput
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
      />
    </ItemConsumableCheckboxContainer>
  );
};
