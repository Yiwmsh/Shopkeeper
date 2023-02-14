import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import {
  combineCurrency,
  exchangeCopper,
  exchangeGold,
  exchangeSilver,
} from '../../../functions/currencyFunctions';

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

  const goldRef = React.useRef<HTMLInputElement>(null);
  const silverRef = React.useRef<HTMLInputElement>(null);
  const copperRef = React.useRef<HTMLInputElement>(null);

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
          ref={goldRef}
          min="0"
          onBlur={(event) => {
            const value = Number(event.target.value);
            if (!Number.isNaN(value)) {
              const exchange = exchangeGold(value);
              setGold(exchange.gold);
              setSilver(silver + exchange.silver);
              setCopper(copper + exchange.copper);
              onChange(combineCurrency(gold, silver, copper));
            }
          }}
        />
        <ValueLabel htmlFor="gold">Gold</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="silver"
          type="number"
          min="0"
          ref={silverRef}
          onBlur={(event) => {
            const value = Number(event.target.value);
            if (!Number.isNaN(value)) {
              const exchange = exchangeSilver(value);
              setGold(gold + exchange.gold);
              setSilver(exchange.silver);
              setCopper(copper + exchange.copper);
              onChange(combineCurrency(gold, silver, copper));
            }
          }}
        />
        <ValueLabel htmlFor="silver">Silver</ValueLabel>
      </ValueInputSubdivision>
      <ValueInputSubdivision>
        <ValueField
          name="copper"
          type="number"
          min="0"
          ref={copperRef}
          onBlur={(event) => {
            debugger;
            const value = Number(event.target.value);
            if (!Number.isNaN(value)) {
              const exchange = exchangeCopper(value);
              setGold(gold + exchange.gold);
              setSilver(silver + exchange.silver);
              setCopper(exchange.copper);
              onChange(combineCurrency(gold, silver, copper));
            }
          }}
        />
        <ValueLabel>Copper</ValueLabel>
      </ValueInputSubdivision>
    </ValueInputContainer>
  );
};
