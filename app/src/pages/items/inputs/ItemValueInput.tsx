import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { exchangeGold } from '../../../functions';

const ValueField = styled.input`
  width: 50px;
  -webkit-appearance: none;
  -moz-appearance: textfield;
`;

const ValueLabel = styled.label``;

const ValueInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ValueInputSubdivision = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ItemValueInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const values = exchangeGold(value);
  const [gold, setGold] = React.useState(values.gold);
  const [silver, setSilver] = React.useState(values.silver);
  const [copper, setCopper] = React.useState(values.copper);

  useEffect(() => {
    const exchange = exchangeGold(value);
    setGold(exchange.gold);
    setSilver(exchange.silver);
    setCopper(exchange.copper);
  }, [value]);

  return (
    <ValueInputContainer>
      <ValueLabel>Value: </ValueLabel>
      <ValueInputSubdivision>
        <ValueField
          name="gold"
          type="number"
          min="0"
          value={gold}
          onChange={(e) => setGold(Number(e.target.value))}
          onBlur={(event) => {
            const target = Number(event.target.value);
            onChange(target + silver / 10 + copper / 100);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <ValueLabel htmlFor="gold">Gold</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="silver"
          type="number"
          min="0"
          value={silver}
          onChange={(e) => setSilver(Number(e.target.value))}
          onBlur={(event) => {
            const target = Number(event.target.value);
            onChange(gold + target / 10 + copper / 100);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <ValueLabel htmlFor="silver">Silver</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="copper"
          type="number"
          min="0"
          value={copper}
          onChange={(e) => setCopper(Number(e.target.value))}
          onBlur={(event) => {
            const target = Number(event.target.value);
            onChange(gold + silver / 10 + target / 100);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <ValueLabel htmlFor="copper">Copper</ValueLabel>
      </ValueInputSubdivision>
    </ValueInputContainer>
  );
};
