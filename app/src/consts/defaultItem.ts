import { Item } from '../types';

export const DEFAULT_ITEM: Item = {
  name: '',
  uid: '',
  value: 0,
  weight: 0,
  description: '',
  magic: false,
  rarity: 'Common',
  consumable: false,
  stockRange: {
    high: 10,
    low: 0,
  },
};
