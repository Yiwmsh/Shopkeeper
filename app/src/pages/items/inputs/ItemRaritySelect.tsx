import styled from '@emotion/styled';
import { rarities } from '../item';

const RarityOption = styled.option``;

const RarityLabel = styled.label``;

const RaritySelect = styled.select``;

const RaritySelectContainer = styled.div``;

export const ItemRaritySelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <RaritySelectContainer>
      <RarityLabel>Rarity</RarityLabel>
      <RaritySelect
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {rarities.map((rarity) => (
          <RarityOption value={`${rarity.toLowerCase()}`}>
            {rarity}
          </RarityOption>
        ))}
      </RaritySelect>
    </RaritySelectContainer>
  );
};
