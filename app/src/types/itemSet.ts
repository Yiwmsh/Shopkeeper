import { IdentifiableObject } from './identifiableObject';
import { saveableObject } from './saveableObject';

export interface ItemSet extends IdentifiableObject, saveableObject {
  description: string;
  itemIDs: string[];
}
