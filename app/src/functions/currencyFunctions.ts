export const displayValue = (value: number): string => {
  const gold = Math.floor(value);
  const silver = Math.floor(value * 10 - gold * 10);
  const copper = Math.floor(value * 100 - gold * 100 - silver * 10);
  return `${gold} gold${silver > 0 ? `, ${silver} silver` : ''}${
    copper > 0 ? `, ${copper} copper` : ''
  }`;
};

export const exchangeCopper = (
  value: number
): { gold: number; silver: number; copper: number } => {
  const gold = Math.floor(value / 100);
  const silver = Math.floor((value - gold * 100) / 10);
  const copper = Math.floor(value - gold * 100 - silver * 10);
  return { gold: gold, silver: silver, copper: copper };
};

export const exchangeSilver = (
  value: number
): { gold: number; silver: number; copper: number } => {
  const gold = Math.floor(value / 10);
  const silver = Math.floor(value - gold * 10);
  const copper = Math.floor((value - Math.floor(value)) * 10);
  return { gold: gold, silver: silver, copper: copper };
};

export const exchangeGold = (
  value: number
): { gold: number; silver: number; copper: number } => {
  const gold = Math.floor(value);
  const silver = Math.floor((value - gold) * 10);
  const copper = Math.floor((value - gold) * 100 - silver * 10);
  return { gold: gold, silver: silver, copper: copper };
};

export const combineCurrency = (
  gold: number,
  silver: number,
  copper: number
): number => {
  return gold + silver / 10 + copper / 100;
};
