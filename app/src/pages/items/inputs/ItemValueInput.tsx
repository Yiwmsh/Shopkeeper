import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { exchangeGold } from '../../../functions/currencyFunctions';

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
  const [gold, baseSetGold] = React.useState(values.gold);
  const [silver, baseSetSilver] = React.useState(values.silver);
  const [copper, baseSetCopper] = React.useState(values.copper);

  const goldRef = React.useRef<HTMLInputElement>(null);
  const silverRef = React.useRef<HTMLInputElement>(null);
  const copperRef = React.useRef<HTMLInputElement>(null);

  const setGold = (value: number) => {
    baseSetGold(value);
    if (goldRef.current) {
      goldRef.current.value = `${value}`;
    }
  };
  const setSilver = (value: number) => {
    baseSetSilver(value);
    if (silverRef.current) {
      silverRef.current.value = `${value}`;
    }
  };
  const setCopper = (value: number) => {
    baseSetCopper(value);
    if (copperRef.current) {
      copperRef.current.value = `${value}`;
    }
  };

  const setValue = () => {
    onChange(gold + silver / 10 + copper / 100);
  };

  useEffect(() => {
    const exchangedValue = exchangeGold(value);
    setGold(exchangedValue.gold);
    setSilver(exchangedValue.silver);
    setCopper(exchangedValue.copper);
  }, [value]);

  return (
    <ValueInputContainer>
      <ValueLabel>Value: </ValueLabel>
      <ValueInputSubdivision>
        <ValueField
          name="gold"
          type="number"
          ref={goldRef}
          onChange={(event) => {
            setGold(Number(event.target.value));
            setValue();
          }}
        />
        <ValueLabel htmlFor="gold">Gold</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="silver"
          type="number"
          ref={silverRef}
          onChange={(event) => {
            const value = Number(event.target.value);
            const silver = value > 10 ? value - Math.floor(value / 10) : value;
            setSilver(value);
            if (value > 10) {
              setGold(gold + Math.floor(value / 10));
            }
            setValue();
          }}
        />
        <ValueLabel htmlFor="silver">Silver</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="copper"
          type="number"
          ref={copperRef}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (value > 10) {
              if (value > 100) {
                const gold = Math.floor(value / 100);
              } else {
              }
            } else {
            }
            setValue();
          }}
        />
        <ValueLabel htmlFor="copper">Copper</ValueLabel>
      </ValueInputSubdivision>
    </ValueInputContainer>
  );
};
