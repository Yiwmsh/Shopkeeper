import styled from '@emotion/styled';

const StockRangeInputContainer = styled.div``;
const StockRangeInputLabel = styled.label``;
const StockRangeInputField = styled.input`
  width: 50px;
`;

export const ItemStockRangeInput: React.FC<{
  lowValue: number;
  highValue: number;
  lowValueChange: (value: number) => void;
  highValueChange: (value: number) => void;
}> = ({ lowValue, lowValueChange, highValue, highValueChange }) => {
  return (
    <StockRangeInputContainer>
      <StockRangeInputLabel>Stock Range: </StockRangeInputLabel>
      <StockRangeInputField
        value={lowValue}
        onChange={(event) => {
          try {
            lowValueChange(Number(event.target.value));
          } catch (e) {
            console.log(e);
          }
        }}
        type="number"
        name="low range value"
      />{' '}
      -{' '}
      <StockRangeInputField
        value={highValue}
        onChange={(event) => {
          try {
            highValueChange(Number(event.target.value));
          } catch (e) {
            console.log(e);
          }
        }}
        type="number"
        name="high range value"
      />
    </StockRangeInputContainer>
  );
};
