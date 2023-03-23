import { IdentifiableObject } from './identifiableObject';
import { Item } from './item';

export interface Shop extends IdentifiableObject {
  itemIds: string[];
  description: string;
  priceModifier: number;
  inventory: Item[];
}
