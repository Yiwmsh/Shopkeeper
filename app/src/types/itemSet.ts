import { IdentifiableObject } from './identifiableObject';

export interface ItemSet extends IdentifiableObject {
  description: string;
  itemIDs: string[];
}
