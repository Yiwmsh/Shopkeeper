import styled from '@emotion/styled';
import { ItemDisplayProps } from './ItemDisplayInput';

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const DescriptionLabel = styled.label``;

const DescriptionField = styled.textarea``;

export const ItemDescriptionInput: React.FC<ItemDisplayProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <DescriptionRow>
      <DescriptionLabel>{label}</DescriptionLabel>
      <DescriptionField
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </DescriptionRow>
  );
};
