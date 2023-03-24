import { IdentifiableObject } from './identifiableObject';
import { Item } from './item';
import { saveableObject } from './saveableObject';

export interface Shop extends IdentifiableObject, saveableObject {
  itemIds: string[];
  description: string;
  priceModifier: number;
  inventory: Item[];
}
